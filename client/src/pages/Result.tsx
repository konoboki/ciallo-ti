/**
 * Result - 测试结果页面
 * 布局顺序：立绘卡（放大）→ 角色信息 → 评分区域 → 配对描述 → 测试者MBTI → 维度分析
 * 评分/计数使用 Cloudflare Pages Functions API (/api/ratings/:characterId)
 */
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { getMatchedCharacter, getMatchDescription } from "@/lib/characters";
import type { MbtiResult } from "@/lib/questions";
import { RotateCcw, Share2, Users, Star, Heart } from "lucide-react";
import { toast } from "sonner";

const YUZU_LOGO = `/cialloti-logo.jpg`;

/** 生成或获取匿名 sessionId */
function getSessionId(): string {
  let sid = localStorage.getItem("cialloti_session");
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("cialloti_session", sid);
  }
  return sid;
}

interface RatingStats {
  match_count: number;
  rating_count: number;
  avg_rating: number;
}

/** 调用 Pages Functions API 获取角色统计 */
async function fetchStats(characterId: string): Promise<RatingStats | null> {
  try {
    const res = await fetch(`/api/ratings/${encodeURIComponent(characterId)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** 调用 Pages Functions API 提交匹配记录 */
async function postMatch(characterId: string): Promise<void> {
  try {
    await fetch(`/api/ratings/${encodeURIComponent(characterId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "match" }),
    });
  } catch {
    // 静默失败
  }
}

/** 调用 Pages Functions API 提交评分 */
async function postRating(
  characterId: string,
  sessionId: string,
  rating: number
): Promise<{ user_rating: number; rating_count: number; avg_rating: number } | null> {
  try {
    const res = await fetch(`/api/ratings/${encodeURIComponent(characterId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "rate", rating, session_id: sessionId }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

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

/** 星级评分组件 */
function StarRating({
  value,
  onChange,
  disabled,
}: {
  value: number | null;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value ?? 0;

  return (
    <div className="flex gap-1.5 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={disabled}
          onClick={() => onChange(star)}
          onMouseEnter={() => !disabled && setHovered(star)}
          onMouseLeave={() => !disabled && setHovered(null)}
          className={`transition-all duration-150 ${disabled ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
          aria-label={`${star}星`}
        >
          <Star
            size={28}
            className="transition-colors duration-150"
            fill={star <= display ? "#FF8C42" : "none"}
            stroke={star <= display ? "#FF8C42" : "#D1D5DB"}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

export default function Result() {
  const [, navigate] = useLocation();
  const [result, setResult] = useState<MbtiResult | null>(null);
  const sessionId = useRef(getSessionId());
  const recordedRef = useRef(false);

  // 评分/统计状态
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [myRating, setMyRating] = useState<number | null>(null);
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("mbtiResult");
    if (!raw) { navigate("/"); return; }
    try {
      setResult(JSON.parse(raw) as MbtiResult);
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const char = result ? getMatchedCharacter(result.mbti) : null;

  // 加载统计数据
  const loadStats = useCallback(async () => {
    if (!char?.id) return;
    const data = await fetchStats(char.id);
    if (data) setStats(data);
  }, [char?.id]);

  // 记录匹配次数（只记录一次）
  useEffect(() => {
    if (char?.id && !recordedRef.current) {
      recordedRef.current = true;
      postMatch(char.id).then(() => loadStats());
    }
  }, [char?.id, loadStats]);

  // 初始加载统计
  useEffect(() => {
    if (char?.id) loadStats();
  }, [char?.id, loadStats]);

  // 提交评分
  const handleRate = async (rating: number) => {
    if (!char?.id || isRating) return;
    setIsRating(true);
    const res = await postRating(char.id, sessionId.current, rating);
    setIsRating(false);
    if (res) {
      setMyRating(res.user_rating);
      setStats((prev) => ({
        match_count: prev?.match_count ?? 0,
        rating_count: res.rating_count,
        avg_rating: res.avg_rating,
      }));
      toast.success("评分已提交！感谢你的反馈 ♡");
    } else {
      toast.error("评分提交失败，请稍后再试");
    }
  };

  if (!result || !char) return null;

  const matchDesc = getMatchDescription(result.mbti);
  const { ratios, balanced } = result;

  const tiedDims = [
    balanced.EI && "E/I",
    balanced.SN && "S/N",
    balanced.TF && "T/F",
    balanced.JP && "J/P",
  ].filter(Boolean).join("、");
  const hasTied = tiedDims.length > 0;

  const matchCount = stats?.match_count ?? 0;
  const avgRating = stats && stats.rating_count > 0 ? stats.avg_rating : null;
  const ratingCount = stats?.rating_count ?? 0;

  function handleShare() {
    const text = `我的MBTI是 ${result!.mbti}，最适合和柚子社的「${char!.name}」结婚！快来测测你的结果吧～`;
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
          {/* 图片区域 */}
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
                className="block mx-auto"
                style={{ width: "66.67%", maxHeight: "48vw", objectFit: "contain", objectPosition: "center top" }}
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
              <p
                className="text-sm font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #FF8C42, #FF6B1A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                最适合结婚的角色
              </p>
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

        {/* ② 评分 & 计数区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 px-5 py-5"
        >
          {/* 计数行 */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Heart size={14} className="text-orange-400" fill="#FF8C42" />
              <span>
                已有 <span className="font-bold text-orange-500">{matchCount.toLocaleString()}</span> 人
                与 {char.name} 配对
              </span>
            </div>
            {avgRating !== null && ratingCount > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                <Star size={13} fill="#FF8C42" stroke="#FF8C42" />
                <span className="font-bold text-orange-500">{avgRating}</span>
                <span className="text-gray-400 text-xs">（{ratingCount}人评分）</span>
              </div>
            )}
          </div>

          {/* 评分区域 */}
          <div>
            <p className="text-xs text-gray-400 mb-2.5">
              {myRating ? "你已给出评分，点击可修改" : "你觉得这个配对结果如何？给它打个分吧！"}
            </p>
            <div className="flex items-center gap-3">
              <StarRating
                value={myRating}
                onChange={handleRate}
                disabled={isRating}
              />
              <AnimatePresence>
                {myRating && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-orange-400 font-medium"
                  >
                    {["", "不太合适", "还行吧", "挺好的", "非常好！", "完美配对！"][myRating]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ③ 配对描述 */}
        {matchDesc && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 rounded-2xl px-5 py-4"
            style={{ background: "linear-gradient(135deg, #FFF8F0, #FFF3E8)", border: "1px solid #FFE0C5" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#FF8C42" }}>为什么是 Ta？</p>
            <p className="text-sm leading-relaxed text-gray-600" style={{ fontFamily: "'Noto Serif SC', serif" }}>{matchDesc}</p>
          </motion.div>
        )}

        {/* ④ 测试者 MBTI 类型 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
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

        {/* ⑤ 维度分析 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl px-6 py-6 mb-8 mt-4"
        >
          <h4 className="text-xs font-bold text-gray-400 mb-5 tracking-widest uppercase">维度分析</h4>
          <DimBar
            leftLabel="外向" rightLabel="内向"
            leftPct={ratios.E}
            leftWins={result.mbti[0] === "E"}
            tied={balanced.EI}
            color="#FF8C42"
            delay={0.4}
          />
          <DimBar
            leftLabel="实感" rightLabel="直觉"
            leftPct={ratios.S}
            leftWins={result.mbti[1] === "S"}
            tied={balanced.SN}
            color="#4CAF82"
            delay={0.55}
          />
          <DimBar
            leftLabel="思考" rightLabel="情感"
            leftPct={ratios.T}
            leftWins={result.mbti[2] === "T"}
            tied={balanced.TF}
            color="#5B8CFF"
            delay={0.7}
          />
          <DimBar
            leftLabel="判断" rightLabel="感知"
            leftPct={ratios.J}
            leftWins={result.mbti[3] === "J"}
            tied={balanced.JP}
            color="#C85BFF"
            delay={0.85}
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
