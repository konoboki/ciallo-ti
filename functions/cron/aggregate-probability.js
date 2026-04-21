// Cloudflare Cron Trigger Worker - 每小时聚合概率
// 触发时间：每小时整点（0 0 * * * *）
// 功能：从 D1 读取 character_stats，计算概率，写入 KV

export async function onSchedule(event, env) {
  try {
    console.log("[Cron] Starting probability aggregation...");

    // 从 D1 读取所有角色的 match_count
    const result = await env.DB.prepare(
      "SELECT character_id, match_count FROM character_stats WHERE match_count > 0"
    ).all();

    if (!result.results || result.results.length === 0) {
      console.log("[Cron] No character stats found");
      await env.KV.put("probability_cache", JSON.stringify({
        timestamp: Date.now(),
        total_matches: 0,
        probabilities: {}
      }));
      return;
    }

    // 计算总匹配数
    const totalMatches = result.results.reduce((sum, row) => sum + row.match_count, 0);

    // 计算每个角色的概率
    const probabilities = {};
    result.results.forEach(row => {
      probabilities[row.character_id] = {
        count: row.match_count,
        percentage: totalMatches > 0
          ? Math.round((row.match_count / totalMatches) * 1000) / 10
          : 0
      };
    });

    // 写入 KV 缓存
    const cacheData = {
      timestamp: Date.now(),
      total_matches: totalMatches,
      probabilities: probabilities
    };

    await env.KV.put("probability_cache", JSON.stringify(cacheData), {
      expirationTtl: 3600 // 1小时后过期（虽然下一小时会更新）
    });

    console.log(`[Cron] Aggregation complete. Total matches: ${totalMatches}, Characters: ${Object.keys(probabilities).length}`);

  } catch (e) {
    console.error("[Cron] Error:", e);
    // 即使出错也不要中断，下一小时再试
  }
}
