/**
 * 题目数据与计分逻辑
 * 24道5级量表题，每题1-5分
 */

export type Dimension = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
}

export const questions: Question[] = [
  // E / I 维度
  { id: 1,  text: "我和陌生人聊天时，通常不会觉得很累。",             dimension: "E" },
  { id: 2,  text: "比起热闹的聚会，我更喜欢一个人安静地待着。",       dimension: "I" },
  { id: 3,  text: "在团队讨论中，我通常会主动先开口。",               dimension: "E" },
  { id: 4,  text: "长时间社交后，我通常需要独处来恢复精力。",         dimension: "I" },
  { id: 5,  text: "遇到新环境时，我往往会主动认识新朋友。",           dimension: "E" },
  { id: 6,  text: "我更喜欢先在心里想清楚，再把想法说出来。",         dimension: "I" },
  // S / N 维度
  { id: 7,  text: "我更关注现实中已经发生的细节，而不是各种可能性。", dimension: "S" },
  { id: 8,  text: "我经常会联想到事情背后的意义、趋势或隐含模式。",   dimension: "N" },
  { id: 9,  text: "学习新东西时，我更喜欢先看具体例子。",             dimension: "S" },
  { id: 10, text: "比起现成的方法，我更喜欢思考新的可能和点子。",     dimension: "N" },
  { id: 11, text: "我更相信经验和事实，而不是灵感。",                 dimension: "S" },
  { id: 12, text: "我常常会被一些抽象概念或未来想象吸引。",           dimension: "N" },
  // T / F 维度
  { id: 13, text: "做决定时，我更重视逻辑是否合理。",                 dimension: "T" },
  { id: 14, text: "即使结论合理，我也会在意它会不会伤害别人。",       dimension: "F" },
  { id: 15, text: "我更容易指出问题，而不是先安慰对方。",             dimension: "T" },
  { id: 16, text: "在冲突中，我通常会优先考虑关系是否和谐。",         dimension: "F" },
  { id: 17, text: "我认为「公平一致」比「因人而异」更重要。",         dimension: "T" },
  { id: 18, text: "我经常会下意识照顾别人的感受。",                   dimension: "F" },
  // J / P 维度
  { id: 19, text: "我喜欢提前安排计划，而不是临时决定。",             dimension: "J" },
  { id: 20, text: "我更喜欢保留选择空间，而不是太早定下来。",         dimension: "P" },
  { id: 21, text: "事情没整理好时，我会感到不舒服。",                 dimension: "J" },
  { id: 22, text: "我经常到最后一刻才集中处理任务。",                 dimension: "P" },
  { id: 23, text: "完成计划本身会让我有安心感。",                     dimension: "J" },
  { id: 24, text: "比起严格按步骤走，我更愿意随机应变。",             dimension: "P" },
];

export const SCALE_LABELS: Record<number, string> = {
  1: "非常不同意",
  2: "不同意",
  3: "中立",
  4: "同意",
  5: "非常同意",
};

export interface DimensionScore {
  score: number;
  total: number;
  ratio: number;
}

export interface MbtiScores {
  E: DimensionScore;
  I: DimensionScore;
  S: DimensionScore;
  N: DimensionScore;
  T: DimensionScore;
  F: DimensionScore;
  J: DimensionScore;
  P: DimensionScore;
}

export interface MbtiResult {
  mbti: string;
  scores: MbtiScores;
  dims: {
    EI: { winner: "E" | "I"; tied: boolean; eRatio: number };
    SN: { winner: "S" | "N"; tied: boolean; sRatio: number };
    TF: { winner: "T" | "F"; tied: boolean; tRatio: number };
    JP: { winner: "J" | "P"; tied: boolean; jRatio: number };
  };
}

export function calculateMbti(answers: Record<number, number>): MbtiResult {
  const raw: Record<Dimension, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  const count: Record<Dimension, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const q of questions) {
    const score = answers[q.id] ?? 3;
    raw[q.dimension] += score;
    count[q.dimension]++;
  }

  const makeScore = (dim: Dimension): DimensionScore => ({
    score: raw[dim],
    total: count[dim] * 5,
    ratio: raw[dim] / (count[dim] * 5),
  });

  const scores: MbtiScores = {
    E: makeScore("E"), I: makeScore("I"),
    S: makeScore("S"), N: makeScore("N"),
    T: makeScore("T"), F: makeScore("F"),
    J: makeScore("J"), P: makeScore("P"),
  };

  const eTotal = raw.E + raw.I;
  const eRatio = eTotal > 0 ? raw.E / eTotal : 0.5;
  const eiTied = raw.E === raw.I;
  const eiWinner: "E" | "I" = eiTied ? "I" : raw.E > raw.I ? "E" : "I";

  const snTotal = raw.S + raw.N;
  const sRatio = snTotal > 0 ? raw.S / snTotal : 0.5;
  const snTied = raw.S === raw.N;
  const snWinner: "S" | "N" = snTied ? "N" : raw.S > raw.N ? "S" : "N";

  const tfTotal = raw.T + raw.F;
  const tRatio = tfTotal > 0 ? raw.T / tfTotal : 0.5;
  const tfTied = raw.T === raw.F;
  const tfWinner: "T" | "F" = tfTied ? "F" : raw.T > raw.F ? "T" : "F";

  const jpTotal = raw.J + raw.P;
  const jRatio = jpTotal > 0 ? raw.J / jpTotal : 0.5;
  const jpTied = raw.J === raw.P;
  const jpWinner: "J" | "P" = jpTied ? "P" : raw.J > raw.P ? "J" : "P";

  const mbti = `${eiWinner}${snWinner}${tfWinner}${jpWinner}`;

  return {
    mbti,
    scores,
    dims: {
      EI: { winner: eiWinner, tied: eiTied, eRatio },
      SN: { winner: snWinner, tied: snTied, sRatio },
      TF: { winner: tfWinner, tied: tfTied, tRatio },
      JP: { winner: jpWinner, tied: jpTied, jRatio },
    },
  };
}
