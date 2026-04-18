/**
 * Characters - 角色图鉴页面
 * 只保留匹配表中的角色，无详情描述
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { characters, getGameList } from "@/lib/characters";
import { ArrowLeft, Gamepad2, X } from "lucide-react";

const YUZU_LOGO = `${import.meta.env.BASE_URL}cialloti-logo.jpg`;

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 border-b border-gray-50">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <img src={YUZU_LOGO} alt="ciallo_ti" className="h-6 object-contain opacity-50" />
          <h1 className="text-lg font-bold text-gray-700" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            角色图鉴
          </h1>
        </div>
      </div>

      {/* Game filter */}
      <div className="px-4 py-3 border-b border-gray-50">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGame("all")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedGame === "all"
                ? "text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:border-orange-200 hover:text-orange-500"
            }`}
            style={selectedGame === "all" ? { background: "linear-gradient(135deg, #FF8C42, #FF6B1A)" } : {}}
          >
            <Gamepad2 size={13} className="inline mr-1.5 -mt-0.5" />
            全部
          </button>
          {games.map((game) => (
            <button
              key={game}
              onClick={() => setSelectedGame(game)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedGame === game
                  ? "text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-orange-200 hover:text-orange-500"
              }`}
              style={selectedGame === game ? { background: "linear-gradient(135deg, #FF8C42, #FF6B1A)" } : {}}
            >
              {game}
            </button>
          ))}
        </div>
      </div>

      {/* Character grid */}
      <div className="px-4 py-6 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((char, i) => (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                onClick={() => setSelectedChar(char.id)}
                className="cursor-pointer group"
              >
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  {/* 色块 / 立绘 */}
                  <div
                    className="aspect-[4/3] flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${char.color}cc, ${char.color}44)` }}
                  >
                    {char.image ? (
                      <img
                        src={char.image}
                        alt={char.name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span
                        className="text-5xl font-black select-none"
                        style={{ color: "rgba(50,50,50,0.3)", fontFamily: "'Noto Serif SC', serif" }}
                      >
                        {char.name.charAt(0)}
                      </span>
                    )}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-xs font-bold bg-white/80 text-gray-600">
                      {char.mbti}
                    </div>
                  </div>
                  {/* 信息 */}
                  <div className="p-3 bg-white">
                    <h3 className="font-bold text-sm text-gray-800 truncate" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                      {char.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{char.game}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 角色详情弹窗 */}
      <AnimatePresence>
        {activeChar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedChar(null)}
          >
            <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* 立绘 / 色块头部 */}
              <div
                className="h-48 flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${activeChar.color}cc, ${activeChar.color}44)` }}
              >
                {activeChar.image ? (
                  <img
                    src={activeChar.image}
                    alt={activeChar.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                ) : (
                  <span
                    className="text-6xl font-black select-none"
                    style={{ color: "rgba(50,50,50,0.25)", fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {activeChar.name.charAt(0)}
                  </span>
                )}
                <button
                  onClick={() => setSelectedChar(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* 信息 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                      {activeChar.name}
                    </h2>
                    <p className="text-sm text-gray-400">{activeChar.nameJa}</p>
                  </div>
                  <span
                    className="text-lg font-black px-3 py-1 rounded-xl"
                    style={{
                      background: `${activeChar.color}44`,
                      color: "#FF6B1A",
                    }}
                  >
                    {activeChar.mbti}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-3">{activeChar.game}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
