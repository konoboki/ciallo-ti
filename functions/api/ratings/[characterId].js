// Cloudflare Pages Functions - 角色评分 API
// GET  /api/ratings/:characterId  → 获取统计
// POST /api/ratings/:characterId  → 提交匹配或评分

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

async function initTables(db) {
 await db.prepare(`
    CREATE TABLE IF NOT EXISTS character_stats (
      character_id TEXT PRIMARY KEY,
      match_count INTEGER NOT NULL DEFAULT 0,
      rating_count INTEGER NOT NULL DEFAULT 0,
      rating_sum INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
      )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS character_ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      character_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      UNIQUE(character_id, session_id)
      )
  `).run();
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet({ params, env }) {
  const characterId = params.characterId;
  try {
    await initTables(env.DB);
    const stats = await env.DB.prepare(
      "SELECT match_count, rating_count, rating_sum FROM character_stats WHERE character_id = ?"
    ).bind(characterId).first();

    return new Response(JSON.stringify({
      character_id: characterId,
      match_count: stats?.match_count ?? 0,
      rating_count: stats?.rating_count ?? 0,
      avg_rating: stats && stats.rating_count > 0
        ? Math.round((stats.rating_sum / stats.rating_count) * 10) / 10
        : 0,
    }), { status: 200, headers: CORS });
  } catch (e) {
    console.error("GET error:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: CORS });
  }
}

export async function onRequestPost({ params, env, request }) {
  const characterId = params.characterId;
  try {
    await initTables(env.DB);
    const body = await request.json();

    if (body.action === "match") {
      await env.DB.prepare(`
        INSERT INTO character_stats (character_id, match_count, rating_count, rating_sum, updated_at)
        VALUES (?, 1, 0, 0, unixepoch())
        ON CONFLICT(character_id) DO UPDATE SET
          match_count = match_count + 1,
          updated_at = unixepoch()
      `).bind(characterId).run();

      const stats = await env.DB.prepare(
        "SELECT match_count FROM character_stats WHERE character_id = ?"
      ).bind(characterId).first();

      return new Response(JSON.stringify({ success: true, match_count: stats?.match_count ?? 1 }), { status: 200, headers: CORS });

    } else if (body.action === "rate") {
      const { rating, session_id } = body;
      if (!rating || rating < 1 || rating > 5)
        return new Response(JSON.stringify({ error: "Invalid rating" }), { status: 400, headers: CORS });
      if (!session_id)
        return new Response(JSON.stringify({ error: "session_id required" }), { status: 400, headers: CORS });

      const existing = await env.DB.prepare(
        "SELECT rating FROM character_ratings WHERE character_id = ? AND session_id = ?"
      ).bind(characterId, session_id).first();

      if (existing) {
        const oldRating = existing.rating;
        await env.DB.prepare(
          "UPDATE character_ratings SET rating = ? WHERE character_id = ? AND session_id = ?"
        ).bind(rating, characterId, session_id).run();
        await env.DB.prepare(`
          UPDATE character_stats SET rating_sum = rating_sum - ? + ?, updated_at = unixepoch()
          WHERE character_id = ?
        `).bind(oldRating, rating, characterId).run();
      } else {
        await env.DB.prepare(
          "INSERT INTO character_ratings (character_id, session_id, rating) VALUES (?, ?, ?)"
        ).bind(characterId, session_id, rating).run();
        await env.DB.prepare(`
          INSERT INTO character_stats (character_id, match_count, rating_count, rating_sum, updated_at)
          VALUES (?, 0, 1, ?, unixepoch())
          ON CONFLICT(character_id) DO UPDATE SET
            rating_count = rating_count + 1,
            rating_sum = rating_sum + ?,
            updated_at = unixepoch()
        `).bind(characterId, rating, rating).run();
      }

      const stats = await env.DB.prepare(
        "SELECT rating_count, rating_sum FROM character_stats WHERE character_id = ?"
      ).bind(characterId).first();

      return new Response(JSON.stringify({
        success: true,
        user_rating: rating,
        rating_count: stats?.rating_count ?? 1,
        avg_rating: stats && stats.rating_count > 0
          ? Math.round((stats.rating_sum / stats.rating_count) * 10) / 10
          : rating,
      }), { status: 200, headers: CORS });

    } else {
      return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400, headers: CORS });
    }
  } catch (e) {
    console.error("POST error:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: CORS });
  }
}
