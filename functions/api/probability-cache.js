// Cloudflare Pages Functions - 概率缓存 API
// GET /api/probability-cache → 从 KV 读取缓存的概率数据

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet({ env }) {
  try {
    // 从 KV 读取缓存
    const cached = await env.KV.get("probability_cache");
    
    if (cached) {
      return new Response(cached, {
        status: 200,
        headers: {
          ...CORS,
          "Cache-Control": "public, max-age=3600" // 浏览器缓存 1 小时
        }
      });
    }

    // 如果缓存不存在，返回空数据
    return new Response(JSON.stringify({
      timestamp: Date.now(),
      total_matches: 0,
      probabilities: {}
    }), { status: 200, headers: CORS });

  } catch (e) {
    console.error("GET probability cache error:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: CORS });
  }
}
