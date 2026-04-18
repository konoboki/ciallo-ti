/**
 * Result - 测试结果页面
 * 布局顺序：立绘卡（放大）→ 角色信息 → 配对描述 → 测试者MBTI → 维度分析
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { getMatchedCharacter, getMatchDescription } from "@/lib/characters";
import type { MbtiResult } from "@/lib/questions";
import { RotateCcw, Share2, Users } from "lucide-react";
import { toast } from "sonner";

const YUZU_LOGO = `${import.meta.env.BASE_URL}cialloti-logo.jpg`;

interface DimBarProps {
  leftLabel: string;
  rightLabel: string;
  leftPct: number;
  leftWins: boolean;
  tied: boolean;
  color: string;
  delay?: number;
}

function DimBar({ leftLabel, rightLabel, leftPct, leftWins, tied, color, delay = 0 }: DimBarProps) {
  const rightPct = 100 - leftPct;
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className={`text-sm font-bold ${leftWins ? "text-gray-800" : "text-gray-400"}`}>
          {leftLabel}
          {tied && leftWins && <span className="ml-1 text-xs font-normal text-orange-400">（略偏）</span>}
        </span>
        <span className={`text-sm font-bold ${!leftWins ? "text-gray-800" : "text-gray-400"}`}>
          {rightLabel}
          {tied && !leftWins && <span className="ml-1 text-xs font-normal text-orange-400">（略偏）</span>}
        </span>
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

export default function Result() {
  const [, navigate] = useLocation();
  const [result, setResult] = useState<MbtiResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("mbtiResult");
    if (!raw) { navigate("/"); return; }
    try {
      setResult(JSON.parse(raw) as MbtiResult);
    } catch {
      navigate("/");
    }
  }, [navigate]);

  if (!result) return null;

  const char = getMatchedCharacter(result.mbti);
  const matchDesc = getMatchDescription(result.mbti);
  const { ratios, balanced } = result;

  const tiedDims = [
    balanced.EI && "E/I",
    balanced.SN && "S/N",
    balanced.TF && "T/F",
    balanced.JP && "J/P",
  ].filter(Boolean).join("、");
  const hasTied = tiedDims.length > 0;

  function handleShare() {
    const text = `我的MBTI是 ${result!.mbti}，最适合和柚子社的「${char.name}」结婚！快来测测你的结果吧～`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => toast.success("已复制到剪贴板！"));
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部 Logo */}
      <div className="px-4 pt-5 pb-2 flex justify-center border-b border-gray-50">
        <button onClick={() => navigate("/")}>
          <img src={YUZU_LOGO} alt="ciallo_ti" className="h-7 object-contain opacity-50 hover:opacity-80 transition-opacity" />
        </button>
      </div>

      <div className="max-w-xl mx-auto px-4 pb-16">

        {/* ① 立绘卡（放大，角色名同屏可见） */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden mt-6 border border-gray-100 shadow-sm"
        >
          {/* 图片区域：有立绘时撑高显示完整图，无立绘时保持色块 */}
          <div
            className="relative overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${char.color}cc, ${char.color}44)`,
              minHeight: char.image ? "0" : "14rem",
            }}
          >
            {char.image ? (
              <img
                src={char.image}
                alt={char.name}
                className="w-full block"
                style={{ maxHeight: "72vw", objectFit: "contain", objectPosition: "center top" }}
              />
            ) : (
              <div className="py-14 flex flex-col items-center">
                <div
                  className="text-4xl font-black mb-1"
                  style={{ fontFamily: "'Noto Serif SC', serif", color: "rgba(50,50,50,0.75)" }}
                >
                  {char.name}
                </div>
                <div className="text-sm" style={{ color: "rgba(50,50,50,0.45)" }}>{char.nameJa}</div>
              </div>
            )}
          </div>

          {/* 角色信息 */}
          <div className="px-6 py-5 bg-white flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">最适合结婚的角色</p>
              <h3
                className="text-xl font-bold text-gray-800"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {char.name}
              </h3>
              <p className="text-sm text-gray-400 mt-0.5">{char.game}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">角色 MBTI</p>
              <span className="text-xl font-black" style={{ color: "#FF8C42" }}>{char.mbti}</span>
            </div>
          </div>
        </motion.div>

        {/* ② 配对描述 */}
        {matchDesc && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 px-5 py-5 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #FFF8F0, #FFF3E8)", border: "1px solid #FFE0C5" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#FF8C42" }}>为什么是 Ta？</p>
            <p className="text-sm leading-relaxed text-gray-600" style={{ fontFamily: "'Noto Serif SC', serif" }}>{matchDesc}</p>
          </motion.div>
        )}

        {/* ③ 测试者 MBTI 类型 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center mt-8 mb-2"
        >
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">Your Personality Type</p>
          <div
            className="text-7xl font-black tracking-widest mb-3"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              background: "linear-gradient(135deg, #FF8C42, #FF6B1A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {result.mbti}
          </div>
          {hasTied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-orange-400"
            >
              {tiedDims} 维度接近平衡，已取略偏方向
            </motion.p>
          )}
        </motion.div>

        {/* ④ 维度分析 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-gray-50 rounded-2xl px-6 py-6 mb-8 mt-4"
        >
          <h4 className="text-xs font-bold text-gray-400 mb-5 tracking-widest uppercase">维度分析</h4>
          <DimBar
            leftLabel="外向" rightLabel="内向"
            leftPct={ratios.E}
            leftWins={result.mbti[0] === "E"}
            tied={balanced.EI}
            color="#FF8C42"
            delay={0.35}
          />
          <DimBar
            leftLabel="实感" rightLabel="直觉"
            leftPct={ratios.S}
            leftWins={result.mbti[1] === "S"}
            tied={balanced.SN}
            color="#4CAF82"
            delay={0.5}
          />
          <DimBar
            leftLabel="思考" rightLabel="情感"
            leftPct={ratios.T}
            leftWins={result.mbti[2] === "T"}
            tied={balanced.TF}
            color="#5B8CFF"
            delay={0.65}
          />
          <DimBar
            leftLabel="判断" rightLabel="感知"
            leftPct={ratios.J}
            leftWins={result.mbti[3] === "J"}
            tied={balanced.JP}
            color="#C85BFF"
            delay={0.8}
          />
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3"
        >
          <button
            onClick={() => { sessionStorage.removeItem("mbtiResult"); navigate("/quiz"); }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200
              text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
          >
            <RotateCcw size={15} /> 重新测试
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #FF8C42, #FF6B1A)",
              boxShadow: "0 4px 16px rgba(255,140,66,0.35)",
            }}
          >
            <Share2 size={15} /> 分享结果
          </button>
        </motion.div>

        <div className="text-center mt-5">
          <button
            onClick={() => navigate("/characters")}
            className="text-sm text-gray-400 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5"
          >
            <Users size={14} /> 查看全部角色图鉴
          </button>
        </div>

        <p className="text-center text-xs text-gray-300 mt-10">
          ciallo_ti · 非官方粉丝作品 · 角色及作品版权归 YUZUSOFT 所有
        </p>
      </div>
    </div>
  );
}
