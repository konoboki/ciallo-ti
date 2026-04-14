/**
 * Quiz - 人格测试页面
 * Design: 纯白背景 + Yuzusoft 品牌色，简洁卡片式答题
 */
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { questions, calculateMbti } from "@/lib/questions";
import { ArrowLeft } from "lucide-react";

const YUZU_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663549831965/R6aBUjAfbK59aXLEgoJeSD/yuzu-logo_9e5b46df.png";

export default function Quiz() {
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showOptions, setShowOptions] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleAnswer = useCallback((dimension: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowOptions(false);

    const newAnswers = { ...answers, [currentQuestion.id]: dimension };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShowOptions(true);
        setIsTransitioning(false);
      }, 350);
    } else {
      const mbti = calculateMbti(newAnswers);
      setTimeout(() => {
        navigate(`/result?mbti=${mbti}`);
      }, 500);
    }
  }, [currentIndex, answers, currentQuestion, isTransitioning, navigate]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setShowOptions(false);
      const newAnswers = { ...answers };
      delete newAnswers[questions[currentIndex - 1].id];
      setAnswers(newAnswers);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setShowOptions(true);
      }, 200);
    }
  }, [currentIndex, isTransitioning, answers]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-yuzu/6 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yuzu-leaf/5 blur-3xl" />

      {/* Top bar */}
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => currentIndex > 0 ? handleBack() : navigate("/")}
              className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <img src={YUZU_LOGO} alt="Yuzusoft" className="h-6 object-contain opacity-60" />
            <div className="flex-1" />
            <span className="text-sm text-foreground/30 font-medium" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
              {currentIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-yuzu to-yuzu-dark"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            {/* Scenario */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6 text-foreground/30 text-sm italic"
            >
              {currentQuestion.scenario}
            </motion.p>

            {/* Question card */}
            <div className="yuzu-card px-6 md:px-8 py-6 mb-6 !shadow-none border border-border">
              <div className="mb-3">
                <span
                  className="yuzu-badge"
                  style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                >
                  Q{currentQuestion.id}
                </span>
              </div>
              <p className="text-foreground/80 leading-relaxed text-lg font-medium" style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
                {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: showOptions ? 1 : 0, y: showOptions ? 0 : 15 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  onClick={() => handleAnswer(option.dimension)}
                  disabled={!showOptions || isTransitioning}
                  className="w-full text-left px-6 py-4 rounded-xl bg-white border border-border hover:border-yuzu-dark/40 hover:bg-yuzu-light/30 transition-all duration-300 group disabled:opacity-50 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="shrink-0 w-7 h-7 rounded-full border-2 border-yuzu/40 flex items-center justify-center text-yuzu-dark text-sm font-bold group-hover:bg-yuzu/10 group-hover:border-yuzu-dark/60 transition-colors mt-0.5"
                      style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                    >
                      {idx === 0 ? "A" : "B"}
                    </span>
                    <span className="text-foreground/70 group-hover:text-foreground transition-colors leading-relaxed">
                      {option.text}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
