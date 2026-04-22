/**
 * Quiz - 二选一情境题测试页面
 * 24道题，每题选 A 或 B，不显示维度信息
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { questions, calculateMbti, type Answer, type Choice } from "@/lib/questions";
import { ChevronLeft, ChevronRight } from "lucide-react";

const YUZU_LOGO = `${import.meta.env.BASE_URL}cialloti-logo.jpg`;

export default function Quiz() {
  const [, navigate] = useLocation();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Choice>>({});
  const [dir, setDir] = useState<1 | -1>(1);
  const movingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const q = questions[idx];
  const progress = (idx / questions.length) * 100;
  const answered = Object.keys(answers).length;
  const cur = answers[q.id];
  const isLast = idx === questions.length - 1;
  const allDone = answered === questions.length;

  // 键盘快捷键：A/B 或 1/2 选择
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "a" || k === "1") pick("A");
      if (k === "b" || k === "2") pick("B");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, answers]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function pick(choice: Choice) {
    if (movingRef.current) return;

    movingRef.current = true;

    const next = { ...answers, [q.id]: choice };
    setAnswers(next);

    if (idx < questions.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setDir(1);
        setIdx(i => i + 1);
        movingRef.current = false;
        timerRef.current = null;
      }, 300);
    } else {
      movingRef.current = false;
    }
  }

  function goBack() {
    if (idx > 0) { setDir(-1); setIdx(i => i - 1); }
  }

  function submit() {
    const answerList: Answer[] = Object.entries(answers).map(([id, choice]) => ({
      questionId: Number(id),
      choice: choice as Choice,
    }));
    const result = calculateMbti(answerList);
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
          <button
            onClick={() => idx > 0 ? goBack() : navigate("/")}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors"
          >
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
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {/* 题号 */}
              <div className="text-center mb-8">
                <div
                  className="text-[5.5rem] font-black leading-none select-none mb-3"
                  style={{ color: "#f3f4f6", fontFamily: "'Noto Serif SC', serif" }}
                >
                  {String(q.id).padStart(2, "0")}
                </div>
                <h2
                  className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed -mt-10 relative z-10"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {q.text}
                </h2>
              </div>

              {/* A / B 选项 */}
              <div className="flex flex-col gap-3">
                {(["A", "B"] as Choice[]).map((choice) => {
                  const label = choice === "A" ? q.optionA : q.optionB;
                  const selected = cur === choice;
                  return (
                    <motion.button
                      key={choice}
                      onClick={() => pick(choice)}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 flex items-start gap-4"
                      style={{
                        background: selected
                          ? "linear-gradient(135deg, #FFF3E8, #FFE0C5)"
                          : "#f9fafb",
                        border: selected
                          ? "2px solid #FF8C42"
                          : "2px solid #e5e7eb",
                        boxShadow: selected
                          ? "0 4px 16px rgba(255,140,66,0.18)"
                          : "none",
                      }}
                    >
                      {/* 字母标签 */}
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
                        style={{
                          background: selected ? "#FF8C42" : "#e5e7eb",
                          color: selected ? "#fff" : "#9ca3af",
                        }}
                      >
                        {choice}
                      </span>
                      <span
                        className="text-base leading-relaxed"
                        style={{
                          color: selected ? "#c05a10" : "#4b5563",
                          fontWeight: selected ? 600 : 400,
                        }}
                      >
                        {label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={goBack}
            disabled={idx === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400
              hover:text-gray-600 hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={15} /> 上一题
          </button>

          <div className="text-xs text-gray-400 text-center">
            已回答 <span className="font-bold" style={{ color: "#FF8C42" }}>{answered}</span> / {questions.length}
          </div>

          {isLast ? (
            <motion.button
              onClick={submit}
              disabled={!allDone}
              whileHover={allDone ? { scale: 1.04 } : {}}
              whileTap={allDone ? { scale: 0.96 } : {}}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold text-white
                disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={allDone ? {
                background: "linear-gradient(135deg, #FF8C42, #FF6B1A)",
                boxShadow: "0 4px 16px rgba(255,140,66,0.4)",
              } : { background: "#d1d5db" }}
            >
              查看结果 <ChevronRight size={15} />
            </motion.button>
          ) : (
            <button
              onClick={() => { setDir(1); setIdx(i => i + 1); }}
              disabled={!cur}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium
                disabled:opacity-25 disabled:cursor-not-allowed transition-all border"
              style={{ color: "#FF8C42", borderColor: "#FFD5B0" }}
            >
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
