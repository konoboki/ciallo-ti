interface Env {
  DB: D1Database;
}

interface RatingStats {
  character_id: string;
  match_count: number;
  rating_count: number;
  rating_sum: number;
  avg_rating: number;
}

// Initialize tables if they don't exist
async function initTables(db: D1Database): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS character_stats (
      character_id TEXT PRIMARY KEY,
      match_count INTEGER NOT NULL DEFAULT 0,
      rating_count INTEGER NOT NULL DEFAULT 0,
      rating_sum INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS character_ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      UNIQUE(character_id, session_id)
    );
  `);
}

// CORS headers helper
function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
};

// GET /api/ratings/:characterId - get stats for a character
export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const characterId = params.characterId as string;

  try {
    await initTables(env.DB);

    const stats = await env.DB.prepare(
      "SELECT character_id, match_count, rating_count, rating_sum FROM character_stats WHERE character_id = ?"
    )
      .bind(characterId)
      .first<RatingStats>();

    const result = {
      character_id: characterId,
      match_count: stats?.match_count ?? 0,
      rating_count: stats?.rating_count ?? 0,
      avg_rating:
        stats && stats.rating_count > 0
          ? Math.round((stats.rating_sum / stats.rating_count) * 10) / 10
          : 0,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("GET ratings error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch ratings" }),
      { status: 500, headers: corsHeaders() }
    );
  }
};

// POST /api/ratings/:characterId - submit a rating or increment match count
export const onRequestPost: PagesFunction<Env> = async ({
  params,
  env,
  request,
}) => {
  const characterId = params.characterId as string;

  try {
    await initTables(env.DB);

    const body = await request.json<{
      action: "match" | "rate";
      rating?: number;
      session_id?: string;
    }>();

    if (body.action === "match") {
      // Increment match count (upsert)
      await env.DB.prepare(`
        INSERT INTO character_stats (character_id, match_count, rating_count, rating_sum, updated_at)
        VALUES (?, 1, 0, 0, unixepoch())
        ON CONFLICT(character_id) DO UPDATE SET
          match_count = match_count + 1,
          updated_at = unixepoch()
      `)
        .bind(characterId)
        .run();

      const stats = await env.DB.prepare(
        "SELECT match_count, rating_count, rating_sum FROM character_stats WHERE character_id = ?"
      )
        .bind(characterId)
        .first<RatingStats>();

      return new Response(
        JSON.stringify({
          success: true,
          match_count: stats?.match_count ?? 1,
        }),
        { status: 200, headers: corsHeaders() }
      );
    } else if (body.action === "rate") {
      const rating = body.rating;
      const sessionId = body.session_id;

      if (!rating || rating < 1 || rating > 5) {
        return new Response(
          JSON.stringify({ error: "Invalid rating (must be 1-5)" }),
          { status: 400, headers: corsHeaders() }
        );
      }

      if (!sessionId) {
        return new Response(
          JSON.stringify({ error: "session_id is required" }),
          { status: 400, headers: corsHeaders() }
        );
      }

      // Check if this session already rated this character
      const existing = await env.DB.prepare(
        "SELECT rating FROM character_ratings WHERE character_id = ? AND session_id = ?"
      )
        .bind(characterId, sessionId)
        .first<{ rating: number }>();

      if (existing) {
        // Update existing rating
        const oldRating = existing.rating;
        await env.DB.prepare(
          "UPDATE character_ratings SET rating = ?, created_at = unixepoch() WHERE character_id = ? AND session_id = ?"
        )
          .bind(rating, characterId, sessionId)
          .run();

        // Update stats: adjust sum by the difference
        await env.DB.prepare(`
          UPDATE character_stats
          SET rating_sum = rating_sum - ? + ?,
              updated_at = unixepoch()
          WHERE character_id = ?
        `)
          .bind(oldRating, rating, characterId)
          .run();
      } else {
        // Insert new rating
        await env.DB.prepare(
          "INSERT INTO character_ratings (character_id, session_id, rating) VALUES (?, ?, ?)"
        )
          .bind(characterId, sessionId, rating)
          .run();

        // Update stats
        await env.DB.prepare(`
          INSERT INTO character_stats (character_id, match_count, rating_count, rating_sum, updated_at)
          VALUES (?, 0, 1, ?, unixepoch())
          ON CONFLICT(character_id) DO UPDATE SET
            rating_count = rating_count + 1,
            rating_sum = rating_sum + ?,
            updated_at = unixepoch()
        `)
          .bind(characterId, rating, rating)
          .run();
      }

      const stats = await env.DB.prepare(
        "SELECT rating_count, rating_sum FROM character_stats WHERE character_id = ?"
      )
        .bind(characterId)
        .first<RatingStats>();

      return new Response(
        JSON.stringify({
          success: true,
          user_rating: rating,
          rating_count: stats?.rating_count ?? 1,
          avg_rating:
            stats && stats.rating_count > 0
              ? Math.round((stats.rating_sum / stats.rating_count) * 10) / 10
              : rating,
        }),
        { status: 200, headers: corsHeaders() }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        { status: 400, headers: corsHeaders() }
      );
    }
  } catch (error) {
    console.error("POST ratings error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: corsHeaders() }
    );
  }
};
