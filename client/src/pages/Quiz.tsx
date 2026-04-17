/**
 * Quiz - 5级量表测试页面
 * 24道题，每题1-5分
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { questions, calculateMbti, SCALE_LABELS } from "@/lib/questions";
import { ChevronLeft, ChevronRight } from "lucide-react";

const YUZU_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663549831965/R6aBUjAfbK59aXLEgoJeSD/yuzu-logo_9e5b46df.png";
const SCALE_OPTIONS = [1, 2, 3, 4, 5] as const;

const DIM_LABEL: Record<string, string> = {
  E: "外向 / 内向", I: "外向 / 内向",
  S: "实感 / 直觉", N: "实感 / 直觉",
  T: "思考 / 情感", F: "思考 / 情感",
  J: "判断 / 感知", P: "判断 / 感知",
};
const DIM_COLOR: Record<string, string> = {
  E: "#FF8C42", I: "#FF8C42",
  S: "#4CAF82", N: "#4CAF82",
  T: "#5B8CFF", F: "#5B8CFF",
  J: "#C85BFF", P: "#C85BFF",
};

export default function Quiz() {
  const [, navigate] = useLocation();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [dir, setDir] = useState<1 | -1>(1);

  const q = questions[idx];
  const progress = (idx / questions.length) * 100;
  const answered = Object.keys(answers).length;
  const cur = answers[q.id];
  const isLast = idx === questions.length - 1;
  const allDone = answered === questions.length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 5) pick(n);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [idx, answers]);

  function pick(score: number) {
    const next = { ...answers, [q.id]: score };
    setAnswers(next);
    if (idx < questions.length - 1) {
      setTimeout(() => { setDir(1); setIdx(i => i + 1); }, 280);
    }
  }

  function goBack() {
    if (idx > 0) { setDir(-1); setIdx(i => i - 1); }
  }

  function submit() {
    const result = calculateMbti(answers);
    sessionStorage.setItem("mbtiResult", JSON.stringify(result));
    navigate("/result");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 顶部进度条 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="h-0.5 bg-gray-100">
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg, #FF8C42, #FF6B1A)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <div className="px-4 py-3 flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => idx > 0 ? goBack() : navigate("/")}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors">
            <ChevronLeft size={16} />
            <img src={YUZU_LOGO} alt="ciallo_ti" className="h-5 object-contain opacity-50" />
          </button>
          <span className="text-sm text-gray-400">
            <span className="font-bold text-gray-700">{idx + 1}</span> / {questions.length}
          </span>
        </div>
      </div>

      {/* 主体 */}
      <div className="flex-1 pt-20 pb-28 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl mx-auto">

          {/* 维度标签 */}
          <div className="flex justify-center mb-5">
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: `${DIM_COLOR[q.dimension]}15`,
                color: DIM_COLOR[q.dimension],
                border: `1px solid ${DIM_COLOR[q.dimension]}30`,
              }}>
              {DIM_LABEL[q.dimension]}
            </span>
          </div>

          {/* 题目 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: dir * 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -32 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {/* 题号 */}
              <div className="text-center mb-8">
                <div className="text-[5rem] font-black leading-none select-none mb-3"
                  style={{ color: "#f3f4f6", fontFamily: "'Noto Serif SC', serif" }}>
                  {String(q.id).padStart(2, "0")}
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed -mt-8 relative z-10"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  {q.text}
                </h2>
              </div>

              {/* 量表 */}
              <div>
                <div className="flex justify-between text-xs text-gray-300 px-2 mb-3">
                  <span>非常不同意</span>
                  <span>非常同意</span>
                </div>
                <div className="flex gap-2 justify-center items-end">
                  {SCALE_OPTIONS.map((score) => {
                    const selected = cur === score;
                    // 尺寸随分值渐增
                    const size = [52, 58, 64, 70, 78][score - 1];
                    return (
                      <motion.button
                        key={score}
                        onClick={() => pick(score)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.93 }}
                        className="rounded-2xl flex flex-col items-center justify-center font-bold text-lg transition-all duration-200 relative focus:outline-none"
                        style={{
                          width: size, height: size,
                          background: selected
                            ? "linear-gradient(135deg, #FF8C42, #FF6B1A)"
                            : "#f9fafb",
                          color: selected ? "#fff" : "#9ca3af",
                          border: selected ? "none" : "1px solid #e5e7eb",
                          boxShadow: selected ? "0 6px 20px rgba(255,140,66,0.35)" : "none",
                        }}
                        title={SCALE_LABELS[score]}
                      >
                        {score}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="text-center h-7 mt-3">
                  <AnimatePresence mode="wait">
                    {cur && (
                      <motion.span key={cur}
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-sm font-medium" style={{ color: "#FF8C42" }}>
                        {SCALE_LABELS[cur]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <button onClick={goBack} disabled={idx === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400
              hover:text-gray-600 hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed transition-all">
            <ChevronLeft size={15} /> 上一题
          </button>

          <div className="text-xs text-gray-400 text-center">
            已回答 <span className="font-bold" style={{ color: "#FF8C42" }}>{answered}</span> / {questions.length}
          </div>

          {isLast ? (
            <motion.button onClick={submit} disabled={!allDone}
              whileHover={allDone ? { scale: 1.04 } : {}}
              whileTap={allDone ? { scale: 0.96 } : {}}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold text-white
                disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={allDone ? {
                background: "linear-gradient(135deg, #FF8C42, #FF6B1A)",
                boxShadow: "0 4px 16px rgba(255,140,66,0.4)",
              } : { background: "#d1d5db" }}>
              查看结果 <ChevronRight size={15} />
            </motion.button>
          ) : (
            <button onClick={() => { setDir(1); setIdx(i => i + 1); }}
              disabled={!cur}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium
                disabled:opacity-25 disabled:cursor-not-allowed transition-all border"
              style={{ color: "#FF8C42", borderColor: "#FFD5B0" }}>
              下一题 <ChevronRight size={15} />
            </button>
          )}
        </div>
        {isLast && !allDone && (
          <p className="text-center text-xs text-gray-400 mt-2">
            还有 {questions.length - answered} 道题未回答，请返回补充
          </p>
        )}
      </div>
    </div>
  );
}
