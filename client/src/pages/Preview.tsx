/**
 * Preview - 结果预览页（开发/演示用）
 * 可直接选择任意 MBTI 类型查看对应结果，无需走完测试流程
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { getMatchedCharacter, getMatchDescription } from "@/lib/characters";
import { RotateCcw, ChevronLeft } from "lucide-react";

const YUZU_LOGO = `${import.meta.env.BASE_URL}cialloti-logo.jpg`;

const ALL_MBTI = [
  "INFP","ENFP","INFJ","ENFJ",
  "INTP","ENTP","INTJ","ENTJ",
  "ISFP","ESFP","ISFJ","ESFJ",
  "ISTP","ESTP","ISTJ","ESTJ",
];

// 模拟各 MBTI 的维度比例（用于展示进度条）
const MOCK_RATIOS: Record<string, { E:number; I:number; S:number; N:number; T:number; F:number; J:number; P:number }> = {
  INFP:  { E:33, I:67, S:33, N:67, T:33, F:67, J:33, P:67 },
  ENFP:  { E:67, I:33, S:33, N:67, T:33, F:67, J:33, P:67 },
  INFJ:  { E:33, I:67, S:33, N:67, T:33, F:67, J:67, P:33 },
  ENFJ:  { E:67, I:33, S:33, N:67, T:33, F:67, J:67, P:33 },
  INTP:  { E:33, I:67, S:33, N:67, T:67, F:33, J:33, P:67 },
  ENTP:  { E:67, I:33, S:33, N:67, T:67, F:33, J:33, P:67 },
  INTJ:  { E:33, I:67, S:33, N:67, T:67, F:33, J:67, P:33 },
  ENTJ:  { E:67, I:33, S:33, N:67, T:67, F:33, J:67, P:33 },
  ISFP:  { E:33, I:67, S:67, N:33, T:33, F:67, J:33, P:67 },
  ESFP:  { E:67, I:33, S:67, N:33, T:33, F:67, J:33, P:67 },
  ISFJ:  { E:33, I:67, S:67, N:33, T:33, F:67, J:67, P:33 },
  ESFJ:  { E:67, I:33, S:67, N:33, T:33, F:67, J:67, P:33 },
  ISTP:  { E:33, I:67, S:67, N:33, T:67, F:33, J:33, P:67 },
  ESTP:  { E:67, I:33, S:67, N:33, T:67, F:33, J:33, P:67 },
  ISTJ:  { E:33, I:67, S:67, N:33, T:67, F:33, J:67, P:33 },
  ESTJ:  { E:67, I:33, S:67, N:33, T:67, F:33, J:67, P:33 },
};

interface DimBarProps {
  leftLabel: string;
  rightLabel: string;
  leftPct: number;
  leftWins: boolean;
  color: string;
  delay?: number;
}

function DimBar({ leftLabel, rightLabel, leftPct, leftWins, color, delay = 0 }: DimBarProps) {
  const rightPct = 100 - leftPct;
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className={`text-sm font-bold ${leftWins ? "text-gray-800" : "text-gray-400"}`}>{leftLabel}</span>
        <span className={`text-sm font-bold ${!leftWins ? "text-gray-800" : "text-gray-400"}`}>{rightLabel}</span>
      </div>
      <div className="h-3 rounded-full bg-gray-100 overflow-hidden relative">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${leftPct}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">{leftPct}%</span>
        <span className="text-xs text-gray-400">{rightPct}%</span>
      </div>
    </div>
  );
}

export default function Preview() {
  const [, navigate] = useLocation();
  const [selected, setSelected] = useState<string | null>(null);

  const char = selected ? getMatchedCharacter(selected) : null;
  const matchDesc = selected ? getMatchDescription(selected) : "";
  const ratios = selected ? MOCK_RATIOS[selected] : null;

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部 */}
      <div className="px-4 pt-5 pb-3 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors"
        >
          <ChevronLeft size={16} /> 返回首页
        </button>
        <img src={YUZU_LOGO} alt="ciallo_ti" className="h-6 object-contain opacity-50" />
        <div className="w-16" />
      </div>

      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* 标题 */}
        <div className="text-center mt-8 mb-6">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Result Preview</p>
          <h1
            className="text-2xl font-black text-gray-800"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            选择 MBTI 预览结果
          </h1>
          <p className="text-sm text-gray-400 mt-2">点击任意类型查看对应匹配角色</p>
        </div>

        {/* MBTI 选择网格 */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {ALL_MBTI.map((mbti) => {
            const c = getMatchedCharacter(mbti);
            const isSelected = selected === mbti;
            return (
              <button
                key={mbti}
                onClick={() => setSelected(mbti === selected ? null : mbti)}
                className="relative rounded-xl py-3 px-1 text-center transition-all duration-200 overflow-hidden"
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${c.color}cc, ${c.color}66)`
                    : `${c.color}33`,
                  border: isSelected ? `2px solid ${c.color}` : "2px solid transparent",
                  boxShadow: isSelected ? `0 4px 16px ${c.color}66` : "none",
                  transform: isSelected ? "scale(1.05)" : "scale(1)",
                }}
              >
                <span
                  className="text-sm font-black block"
                  style={{ color: isSelected ? "#FF6B1A" : "#555" }}
                >
                  {mbti}
                </span>
                <span className="text-xs text-gray-500 block mt-0.5 truncate px-1">{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* 结果展示 */}
        <AnimatePresence mode="wait">
          {selected && char && ratios && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {/* MBTI 大字 */}
              <div className="text-center mb-6">
                <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Your Personality Type</p>
                <div
                  className="text-7xl font-black tracking-widest"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    background: "linear-gradient(135deg, #FF8C42, #FF6B1A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {selected}
                </div>
              </div>

              {/* 配对描述 */}
              {matchDesc && (
                <div
                  className="mb-6 px-5 py-5 rounded-2xl"
                  style={{ background: "linear-gradient(135deg, #FFF8F0, #FFF3E8)", border: "1px solid #FFE0C5" }}
                >
                  <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#FF8C42" }}>为什么是 Ta？</p>
                  <p className="text-sm leading-relaxed text-gray-600" style={{ fontFamily: "'Noto Serif SC', serif" }}>{matchDesc}</p>
                </div>
              )}

              {/* 角色卡 */}
              <div className="rounded-3xl overflow-hidden mb-6 border border-gray-100 shadow-sm">
                <div
                  className="h-56 flex flex-col items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${char.color}cc, ${char.color}44)` }}
                >
                  {char.image ? (
                    <img
                      src={char.image}
                      alt={char.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  ) : (
                    <>
                      <div
                        className="text-4xl font-black mb-1"
                        style={{ fontFamily: "'Noto Serif SC', serif", color: "rgba(50,50,50,0.75)" }}
                      >
                        {char.name}
                      </div>
                      <div className="text-sm" style={{ color: "rgba(50,50,50,0.45)" }}>{char.nameJa}</div>
                    </>
                  )}
                </div>
                <div className="px-6 py-5 bg-white flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">最适合结婚的角色</p>
                    <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                      {char.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">{char.game}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">角色 MBTI</p>
                    <span className="text-xl font-black" style={{ color: "#FF8C42" }}>{char.mbti}</span>
                  </div>
                </div>
              </div>

              {/* 维度分析 */}
              <div className="bg-gray-50 rounded-2xl px-6 py-6 mb-6">
                <h4 className="text-xs font-bold text-gray-400 mb-5 tracking-widest uppercase">维度分析</h4>
                <DimBar leftLabel="外向" rightLabel="内向" leftPct={ratios.E} leftWins={selected[0]==="E"} color="#FF8C42" delay={0.1} />
                <DimBar leftLabel="实感" rightLabel="直觉" leftPct={ratios.S} leftWins={selected[1]==="S"} color="#4CAF82" delay={0.2} />
                <DimBar leftLabel="思考" rightLabel="情感" leftPct={ratios.T} leftWins={selected[2]==="T"} color="#5B8CFF" delay={0.3} />
                <DimBar leftLabel="判断" rightLabel="感知" leftPct={ratios.J} leftWins={selected[3]==="J"} color="#C85BFF" delay={0.4} />
              </div>

              {/* 重置按钮 */}
              <button
                onClick={() => setSelected(null)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200
                  text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
              >
                <RotateCcw size={15} /> 选择其他类型
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-gray-300 mt-10">
          ciallo_ti · 非官方粉丝作品 · 角色及作品版权归 YUZUSOFT 所有
        </p>
      </div>
    </div>
  );
}
