/**
 * Characters - 角色图鉴页面
 * Design: 纯白背景 + 角色代表色渐变卡片，无需外部图片
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { characters, getGameList, mbtiDescriptions } from "@/lib/characters";
import { ArrowLeft, Gamepad2, X } from "lucide-react";

const YUZU_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663549831965/R6aBUjAfbK59aXLEgoJeSD/yuzu-logo_9e5b46df.png";

export default function Characters() {
  const [, navigate] = useLocation();
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const games = getGameList();

  const filtered = selectedGame === "all"
    ? characters
    : characters.filter((c) => c.game === selectedGame);

  const activeChar = characters.find((c) => c.id === selectedChar);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-yuzu/6 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yuzu-leaf/5 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg text-foreground/40 hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <img src={YUZU_LOGO} alt="Yuzusoft" className="h-6 object-contain opacity-60" />
          <h1
            className="text-xl font-bold text-foreground/80"
            style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            角色图鉴
          </h1>
        </div>
      </div>

      {/* Game filter */}
      <div className="relative z-10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGame("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedGame === "all"
                ? "bg-yuzu/15 text-yuzu-dark border border-yuzu/30"
                : "bg-white border border-border text-foreground/50 hover:text-foreground hover:border-foreground/20"
            }`}
          >
            <Gamepad2 size={14} className="inline mr-1.5 -mt-0.5" />
            全部作品
          </button>
          {games.map((game) => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedGame === game
                  ? "bg-yuzu/15 text-yuzu-dark border border-yuzu/30"
                  : "bg-white border border-border text-foreground/50 hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {game}
            </button>
          ))}
        </div>
      </div>

      {/* Character grid */}
      <div className="relative z-10 px-4 py-4 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((char, idx) => (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setSelectedChar(char.id)}
                className="group cursor-pointer"
              >
                <div className="yuzu-card overflow-hidden !rounded-xl">
                  {/* Color gradient header with character initial */}
                  <div
                    className="relative aspect-[4/3] overflow-hidden flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${char.color}, ${char.color}88, white)`,
                    }}
                  >
                    <span
                      className="text-5xl font-black text-white/60 select-none"
                      style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                    >
                      {char.nameJa.charAt(0)}
                    </span>
                    {/* MBTI badge */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-xs font-bold bg-white/80 backdrop-blur-sm text-foreground/70 border border-white/50">
                      {char.mbti}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <h3
                      className="text-foreground font-bold text-sm truncate"
                      style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                    >
                      {char.name}
                    </h3>
                    <p className="text-foreground/35 text-xs mt-0.5 truncate">{char.game}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Character detail modal */}
      <AnimatePresence>
        {activeChar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedChar(null)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Color header */}
              <div
                className="h-24 relative flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${activeChar.color}, ${activeChar.color}88, white)`,
                }}
              >
                <span
                  className="text-7xl font-black text-white/50 select-none"
                  style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                >
                  {activeChar.nameJa.charAt(0)}
                </span>
                <button
                  onClick={() => setSelectedChar(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/60 hover:bg-white/80 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <h2
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                  >
                    {activeChar.name}
                  </h2>
                  <span className="yuzu-badge !text-xs">{activeChar.mbti}</span>
                </div>
                <p className="text-foreground/35 text-sm mb-1">{activeChar.nameJa}</p>
                <p className="text-yuzu-dark/70 text-xs mb-4">{activeChar.game}</p>

                <p
                  className="text-yuzu-dark font-medium text-sm mb-3 italic"
                  style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
                >
                  「{activeChar.tagline}」
                </p>

                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  {activeChar.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {activeChar.traits.map((trait) => (
                    <span key={trait} className="px-2.5 py-1 rounded-full text-xs bg-muted text-foreground/50 border border-border">
                      {trait}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-foreground/30 bg-muted rounded-lg p-3">
                  <span className="text-yuzu-dark font-medium">{activeChar.mbti}</span>
                  {" · "}
                  {mbtiDescriptions[activeChar.mbti]?.title}
                  {" — "}
                  {mbtiDescriptions[activeChar.mbti]?.description}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
