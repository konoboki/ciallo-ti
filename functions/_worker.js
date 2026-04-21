// Cloudflare Pages/Workers scheduled task
// 每小时聚合角色匹配概率并写入 KV: probability_cache

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

  await env.KV.put("probability_cache", JSON.stringify(payload));
  return payload;
}

export async function scheduled(event, env, ctx) {
  try {
    await buildProbabilityCache(env);
  } catch (e) {
    console.error("scheduled probability cache build failed:", e);
  }
}

// 可选：给本地/调试时复用
export { buildProbabilityCache };
