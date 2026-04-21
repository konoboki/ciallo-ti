// Cloudflare Pages Functions - 概率缓存 API
// GET /api/probability-cache → 优先从 KV 读取缓存；KV miss 时回源 D1 现算并写回 KV

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

async function buildProbabilityCache(env) {
  const result = await env.DB.prepare(`
    SELECT character_id, match_count
    FROM character_stats
  `).all();

  const rows = result?.results ?? [];
  const totalMatches = rows.reduce((sum, row) => sum + (row.match_count || 0), 0);

  const probabilities = {};
  for (const row of rows) {
    const count = row.match_count || 0;
    probabilities[row.character_id] = {
      count,
      percentage: totalMatches > 0
        ? Math.round((count / totalMatches) * 1000) / 10
        : 0,
    };
  }

  const payload = {
    timestamp: Date.now(),
    total_matches: totalMatches,
    probabilities,
  };

  if (env.KV) {
    await env.KV.put("probability_cache", JSON.stringify(payload));
  }

  return payload;
}

export async function onRequestGet({ env }) {
  try {
    // 优先读 KV
    if (env.KV) {
      const cached = await env.KV.get("probability_cache");
      if (cached) {
        return new Response(cached, {
          status: 200,
          headers: {
            ...CORS,
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    }

    // KV miss：回源 D1 现算一次，并顺手写回 KV
    const payload = await buildProbabilityCache(env);

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        ...CORS,
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (e) {
    console.error("GET probability cache error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: CORS,
    });
  }
}
