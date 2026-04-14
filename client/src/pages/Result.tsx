/**
 * Result - 测试结果页面
 * Design: 纯白背景 + Yuzusoft 品牌色，角色代表色渐变展示
 */
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearch } from "wouter";
import { characters, mbtiDescriptions, type Character } from "@/lib/characters";
import TypeWriter from "@/components/TypeWriter";
import { RotateCcw, Users, Share2 } from "lucide-react";
import { toast } from "sonner";

const YUZU_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663549831965/R6aBUjAfbK59aXLEgoJeSD/yuzu-logo_9e5b46df.png";

function findBestMatch(mbti: string): Character {
  const exact = characters.find((c) => c.mbti === mbti);
  if (exact) return exact;

  let bestMatch = characters[0];
  let bestScore = 0;
  for (const char of characters) {
    let score = 0;
    for (let i = 0; i < 4; i++) {
      if (char.mbti[i] === mbti[i]) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = char;
    }
  }
  return bestMatch;
}

function getMbtiDimensions(mbti: string) {
  return [
    { label: "能量来源", left: "I 内向", right: "E 外向", value: mbti[0] === "E" ? "right" : "left" as const },
    { label: "认知方式", left: "S 实感", right: "N 直觉", value: mbti[1] === "N" ? "right" : "left" as const },
    { label: "决策方式", left: "T 思考", right: "F 情感", value: mbti[2] === "F" ? "right" : "left" as const },
    { label: "生活态度", left: "J 判断", right: "P 感知", value: mbti[3] === "P" ? "right" : "left" as const },
  ];
}

export default function Result() {
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const [showContent, setShowContent] = useState(false);

  const mbti = useMemo(() => {
    const params = new URLSearchParams(searchString);
    return params.get("mbti") || "INFP";
  }, [searchString]);

  const matchedChar = useMemo(() => findBestMatch(mbti), [mbti]);
  const mbtiInfo = mbtiDescriptions[mbti];
  const dimensions = useMemo(() => getMbtiDimensions(mbti), [mbti]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    const text = `我在YuzuTI柚子社人格测试中的结果是 ${mbti}（${mbtiInfo?.title}），最匹配的角色是「${matchedChar.name}」！来测测你是哪位柚子社角色吧～`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast.success("已复制到剪贴板！");
      });
    } else {
      toast.info(text);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-yuzu/6 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yuzu-leaf/5 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-muted transition-colors"
          >
            <img src={YUZU_LOGO} alt="Home" className="h-6 object-contain opacity-60" />
          </button>
          <h1
            className="text-lg font-bold text-foreground/70"
            style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            测试结果
          </h1>
        </div>
      </div>

      {/* Result content */}
      <div className="relative z-10 px-4 py-6 pb-12">
        <div className="max-w-3xl mx-auto">

          {/* MBTI Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="yuzu-card overflow-hidden mb-6 !shadow-lg"
          >
            <div className="flex flex-col md:flex-row">
              {/* Character color panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-52 shrink-0"
              >
                <div
                  className="h-48 md:h-full flex flex-col items-center justify-center p-6"
                  style={{
                    background: `linear-gradient(135deg, ${matchedChar.color}, ${matchedChar.color}88, white)`,
                  }}
                >
                  <span
                    className="text-7xl font-black text-white/60 select-none mb-2"
                    style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                  >
                    {matchedChar.nameJa.charAt(0)}
                  </span>
                  <span className="text-white/70 text-sm font-medium">{matchedChar.nameJa}</span>
                </div>
              </motion.div>

              {/* Result info */}
              <div className="p-6 flex-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-foreground/30 text-xs tracking-widest mb-1 uppercase">Your Type</div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className="text-4xl font-black text-foreground tracking-wider"
                      style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                    >
                      {mbti}
                    </span>
                    <span
                      className="text-yuzu-dark text-lg font-medium"
                      style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                    >
                      {mbtiInfo?.title}
                    </span>
                  </div>
                  <p className="text-foreground/40 text-sm leading-relaxed mb-4">
                    {mbtiInfo?.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showContent ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-foreground/30 text-xs tracking-widest mb-2 uppercase">Matched Character</div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2
                      className="text-xl font-bold text-foreground"
                      style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                    >
                      {matchedChar.name}
                    </h2>
                    <span className="yuzu-badge !text-xs">{matchedChar.mbti}</span>
                  </div>
                  <p className="text-foreground/30 text-xs mb-2">{matchedChar.game}</p>
                  <p
                    className="text-yuzu-dark/80 text-sm italic"
                    style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                  >
                    「{matchedChar.tagline}」
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Character description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="yuzu-card px-6 py-5 mb-6 !shadow-none border border-border"
          >
            <div className="mb-2">
              <span
                className="yuzu-badge"
                style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
              >
                {matchedChar.name}
              </span>
            </div>
            <div className="text-foreground/70 leading-relaxed text-[15px] min-h-[3em]">
              {showContent && (
                <TypeWriter text={matchedChar.description} speed={25} />
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {matchedChar.traits.map((trait) => (
                <span key={trait} className="px-2.5 py-1 rounded-full text-xs bg-muted text-foreground/50 border border-border">
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>

          {/* MBTI Dimensions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="yuzu-card p-6 mb-6 !shadow-none border border-border"
          >
            <h3
              className="text-foreground/60 text-sm font-medium mb-4"
              style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
            >
              人格维度分析
            </h3>
            <div className="space-y-4">
              {dimensions.map((dim, idx) => (
                <motion.div
                  key={dim.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <div className="flex justify-between text-xs text-foreground/35 mb-1.5">
                    <span>{dim.left}</span>
                    <span className="text-foreground/50 font-medium">{dim.label}</span>
                    <span>{dim.right}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        dim.value === "left"
                          ? "bg-gradient-to-r from-yuzu to-yuzu/50"
                          : "bg-gradient-to-l from-yuzu-leaf to-yuzu-leaf/50 ml-auto"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: dim.value === "left" ? "35%" : "65%" }}
                      transition={{ duration: 0.8, delay: 0.6 + idx * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => navigate("/quiz")}
              className="yuzu-btn flex items-center justify-center gap-2"
              style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
            >
              <RotateCcw size={16} />
              重新测试
            </button>

            <button
              onClick={() => navigate("/characters")}
              className="px-8 py-3 rounded-xl font-semibold border border-border text-foreground/50 hover:text-foreground hover:border-foreground/20 hover:bg-muted transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
            >
              <Users size={16} />
              角色图鉴
            </button>

            <button
              onClick={handleShare}
              className="px-8 py-3 rounded-xl font-semibold border border-border text-foreground/50 hover:text-foreground hover:border-foreground/20 hover:bg-muted transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
            >
              <Share2 size={16} />
              分享结果
            </button>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center text-xs text-foreground/25">
          YuzuTI - 柚子社人格测试 (非官方粉丝作品) · 角色及作品版权归 YUZUSOFT 所有
        </div>
      </footer>
    </div>
  );
}
