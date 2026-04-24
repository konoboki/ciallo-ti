const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const MBTI_RE = /^[EI][SN][TF][JP]$/;
const CHARACTER_ID_RE = /^[a-z0-9-]+$/;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const mbti = typeof body?.mbti === "string" ? body.mbti.trim() : "";
    const characterId = typeof body?.character_id === "string" ? body.character_id.trim() : "";
    const answers = body?.answers;

    if (!MBTI_RE.test(mbti)) {
      return json({ error: "Invalid mbti" }, 400);
    }

    if (!CHARACTER_ID_RE.test(characterId)) {
      return json({ error: "Invalid character_id" }, 400);
    }

    if (!Array.isArray(answers) || answers.length > 24) {
      return json({ error: "Invalid answers" }, 400);
    }

    const deduped = new Map();

    for (const item of answers) {
      const questionId = item?.questionId;
      const choice = item?.choice;

      if (!Number.isInteger(questionId) || questionId < 1 || questionId > 24) {
        return json({ error: "Invalid questionId" }, 400);
      }

      if (choice !== "A" && choice !== "B") {
        return json({ error: "Invalid choice" }, 400);
      }

      if (!deduped.has(questionId)) {
        deduped.set(questionId, choice);
      }
    }

    const statements = [
      env.DB.prepare(`
        INSERT INTO quiz_result_stats (mbti, character_id, total_count, updated_at)
        VALUES (?, ?, 1, unixepoch())
        ON CONFLICT(mbti, character_id) DO UPDATE SET
          total_count = total_count + 1,
          updated_at = unixepoch()
      `).bind(mbti, characterId),
    ];

    for (const [questionId, choice] of deduped.entries()) {
      statements.push(
        env.DB.prepare(`
          INSERT INTO quiz_option_stats (question_id, choice, total_count, updated_at)
          VALUES (?, ?, 1, unixepoch())
          ON CONFLICT(question_id, choice) DO UPDATE SET
            total_count = total_count + 1,
            updated_at = unixepoch()
        `).bind(questionId, choice),
      );

      statements.push(
        env.DB.prepare(`
          INSERT INTO quiz_option_result_stats (question_id, choice, mbti, character_id, total_count, updated_at)
          VALUES (?, ?, ?, ?, 1, unixepoch())
          ON CONFLICT(question_id, choice, mbti, character_id) DO UPDATE SET
            total_count = total_count + 1,
            updated_at = unixepoch()
        `).bind(questionId, choice, mbti, characterId),
      );
    }

    await env.DB.batch(statements);

    return json({ success: true }, 200);
  } catch (error) {
    console.error("quiz-analytics error:", error);
    return json({ error: "Internal Server Error" }, 500);
  }
}
