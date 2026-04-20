/**
 * ciallo_ti - 柚子社人格测试
 * 题目系统：24道二选一情境题
 * 维度信息仅用于计分，不在 UI 中展示
 */

export type DimPair = "EI" | "SN" | "TF" | "JP";
export type Choice = "A" | "B";
export type DimLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  /** 内部计分用，不在 UI 中显示 */
  _dim: DimPair;
  _scoreA: DimLetter;
  _scoreB: DimLetter;
}

export interface Answer {
  questionId: number;
  choice: Choice;
}

export interface MbtiResult {
  mbti: string;
  scores: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number };
  ratios: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number };
  balanced: { EI: boolean; SN: boolean; TF: boolean; JP: boolean };
}

export const questions: Question[] = [
  // ── E / I ──
  {
    id: 1,
    text: "和喜欢的人一起度过了很开心的半天后，你通常更想：",
    optionA: "再去找点别的事做，和人待着会让我更有精神",
    optionB: "自己安静一下，把刚刚的感觉慢慢回味",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },
  {
    id: 2,
    text: "刚进一个新班级或新社团时，你通常是：",
    optionA: "先观察氛围和大家的性格，熟了以后自然会说更多",
    optionB: "会先和周围人聊几句，边接触边进入状态",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 3,
    text: "群聊里突然聊到你很感兴趣的话题时，你更像：",
    optionA: "想好再发，宁愿少说一点也想表达准确",
    optionB: "会直接加入聊天，边说边整理自己的想法",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 4,
    text: "如果周末没有安排，你更容易觉得：",
    optionA: "一直没人说话有点闷，想找人一起做点什么",
    optionB: "能自己安静待着反而挺舒服，不会觉得空",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },
  {
    id: 5,
    text: "第一次和有好感的人一起参加多人活动，你通常更自然会：",
    optionA: "先把注意力放在整体气氛和大家互动上",
    optionB: "更专注感受那个人的反应，不会一下子特别外放",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },
  {
    id: 6,
    text: "想和在意的人慢慢变熟时，你更常见的方式是：",
    optionA: "在一次次自然互动里慢慢拉近距离",
    optionB: "先在心里确认自己的感觉，再找合适机会靠近",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },

  // ── S / N ──
  {
    id: 7,
    text: "准备第一次约会时，你更先在意：",
    optionA: "时间、路线、预算、店铺这些具体安排",
    optionB: "整体感觉会不会特别，有没有记忆点",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },
  {
    id: 8,
    text: "喜欢的人送了你一个小礼物，你第一反应更像：",
    optionA: "先注意它本身的细节：是什么、怎么挑的、什么时候准备的",
    optionB: "会不自觉去想，这份礼物是不是在传达某种心意",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },
  {
    id: 9,
    text: "回想一次很开心的相处经历时，你更先想起：",
    optionA: "当时具体发生了什么，像几个清晰片段",
    optionB: "那一天整体给你的感觉，还有关系的变化",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },
  {
    id: 10,
    text: "你发现某个人最近对你比以前更温柔了，你更倾向这样判断：",
    optionA: "看她具体做了哪些和平时不同的事",
    optionB: "从整体氛围里感觉，她对你的态度是不是变了",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },
  {
    id: 11,
    text: "一起逛文化祭时，如果要安排路线，你更倾向：",
    optionA: "先看地图和摊位信息，按顺序逛更省事",
    optionB: "先想今天想留下什么感觉，再决定去哪",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },
  {
    id: 12,
    text: "聊天时对方说了一句有点暧昧的话，你更容易：",
    optionA: "留意她说这句话时的语气、表情和前后语境",
    optionB: "很快联想到她是不是在试探关系的方向",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },

  // ── T / F ──
  {
    id: 13,
    text: "朋友来问你要不要向喜欢的人表白，你通常会先：",
    optionA: "帮他分析现在适不适合、可能会发生什么",
    optionB: "先弄清楚他现在最在意、最害怕的是什么",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 14,
    text: "如果你在意的人因为一件事心情很差，你更自然会：",
    optionA: "先判断问题出在哪，看看怎么处理最有效",
    optionB: "先让对方感觉自己被理解，再慢慢往下说",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 15,
    text: "后辈明显对你有好感，但状态也有点敏感不稳定。你更看重：",
    optionA: "边界和表达要清楚，避免后面更复杂",
    optionB: "方式要尽量照顾她的感受，不想让她太受伤",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 16,
    text: "约会对象迟到了很久，还一脸慌张地赶到。你更自然会：",
    optionA: "先确认到底发生了什么，避免后面安排继续乱掉",
    optionB: "先让她放松下来，再慢慢说刚才怎么了",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 17,
    text: "喜欢的人和朋友闹矛盾，来找你倾诉。你通常更倾向：",
    optionA: "帮她理清问题核心，想想下一步怎么处理",
    optionB: "先接住她现在的情绪，让她别一个人难受",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 18,
    text: "如果不得不拒绝一个对你有好感的人，你更希望自己：",
    optionA: "把意思表达清楚，不留下模糊误解",
    optionB: "把方式处理得柔和一点，尽量减少伤害",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },

  // ── J / P ──
  {
    id: 19,
    text: "终于约到喜欢的人周末出去，你通常会：",
    optionA: "提前把大致安排想好，这样当天更安心",
    optionB: "先约出来再说，现场顺着感觉走也不错",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 20,
    text: "第一次约会当天突然下雨，原计划被打乱。你更像：",
    optionA: "很快切换到备选方案，想把节奏拉回来",
    optionB: "干脆接受变化，看看新的情况会把你们带到哪",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 21,
    text: "和喜欢的人聊天越来越暧昧时，你更倾向：",
    optionA: "想知道关系大概到哪一步了，不喜欢一直悬着",
    optionB: "觉得这种自然升温本身就很好，不急着定义",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 22,
    text: "收到“今晚要不要出来走走？”这种临时邀约时，你更舒服的是：",
    optionA: "先把大致时间地点讲清楚，再决定怎么安排",
    optionB: "先看自己想不想去，去了以后再自然展开",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 23,
    text: "准备送喜欢的人生日礼物时，你通常会：",
    optionA: "提前想很久，早一点决定比较踏实",
    optionB: "一边看一边等灵感，最后挑最对感觉的",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 24,
    text: "当一段关系刚开始变近时，你更希望：",
    optionA: "节奏是清楚的，自己大概知道接下来会怎么发展",
    optionB: "让它自然流动，不想太早被固定成某种样子",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
];

/**
 * 根据答案计算 MBTI 类型
 * 按题目定义计分：每题的 A/B 选项对应指定维度字母 +1
 * 平分时默认偏向 I/N/F/P（内倾偏向）
 */
export function calculateMbti(answers: Answer[]): MbtiResult {
  const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const ans of answers) {
    const q = questions.find(q => q.id === ans.questionId);
    if (!q) continue;
    const letter = ans.choice === "A" ? q._scoreA : q._scoreB;
    s[letter]++;
  }

  const eiT = s.E + s.I || 1;
  const snT = s.S + s.N || 1;
  const tfT = s.T + s.F || 1;
  const jpT = s.J + s.P || 1;

  const ratios = {
    E: Math.round((s.E / eiT) * 100),
    I: Math.round((s.I / eiT) * 100),
    S: Math.round((s.S / snT) * 100),
    N: Math.round((s.N / snT) * 100),
    T: Math.round((s.T / tfT) * 100),
    F: Math.round((s.F / tfT) * 100),
    J: Math.round((s.J / jpT) * 100),
    P: Math.round((s.P / jpT) * 100),
  };

  const balanced = {
    EI: s.E === s.I,
    SN: s.S === s.N,
    TF: s.T === s.F,
    JP: s.J === s.P,
  };

  // 平分时默认取 I/N/F/P
  const mbti = [
    s.E > s.I ? "E" : "I",
    s.S > s.N ? "S" : "N",
    s.T > s.F ? "T" : "F",
    s.J > s.P ? "J" : "P",
  ].join("");

  return { mbti, scores: s, ratios, balanced };
}
