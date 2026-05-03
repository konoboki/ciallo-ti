/**
 * ciallo_ti - 柚子社人格测试
 * 题目系统：24道二选一情境题
 * 维度信息仅用于计分，不在 UI 中展示
 */

export type QuizMode = "popular" | "extended";
export type DimPair = "EI" | "SN" | "TF" | "JP" | "SR";
export type Choice = "A" | "B";
export type DimLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P" | "R";

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
  scores: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number; R: number };
  ratios: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number; R: number };
  balanced: { EI: boolean; SN: boolean; TF: boolean; JP: boolean; SR: boolean };
  sr?: "S" | "R";
}

export const popularQuestions: Question[] = [
  // ── E / I ──
  {
    id: 1,
    text: "放学路上，平时只偶尔见面的学妹主动朝你挥手打招呼。你更可能：",
    optionA: "礼貌回应，但会等对方继续带话题",
    optionB: "立刻自然接话，顺势多聊两句",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 2,
    text: "朋友把你拉去参加联谊，现场有个很可爱的转学生坐在你旁边。你通常会：",
    optionA: "主动先开一个轻松的话题",
    optionB: "先观察她的反应，再决定说什么",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },
  {
    id: 3,
    text: "你被拉进一个小群，里面有你有点在意的人。群里气氛很好。你更像：",
    optionA: "先看大家在聊什么，找到合适节点再发言",
    optionB: "很快就加入聊天，想到什么先说出来",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 4,
    text: "第一次和喜欢的人单独出去后，你的感受更接近：",
    optionA: "相处很开心，但之后会想自己安静回味一下",
    optionB: "聊完反而更来劲，还想继续相处",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 5,
    text: "文化祭分组时，和你同组的是几个不太熟的人，其中还有你有好感的对象。你会：",
    optionA: "主动带一下气氛，让大家更快熟起来",
    optionB: "先低调配合，熟了以后再慢慢放开",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },
  {
    id: 6,
    text: "你想向喜欢的人表达一点好感时，通常会：",
    optionA: "边相处边试着靠近，在互动里自然熟起来",
    optionB: "先在心里确认自己对她的感觉，再决定靠多近",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },

  // ── S / N ──
  {
    id: 7,
    text: "第一次约会前，你更在意：",
    optionA: "整体氛围会不会特别，能不能留下记忆点",
    optionB: "时间、路线、吃什么、怎么走这些具体细节",
    _dim: "SN",
    _scoreA: "N",
    _scoreB: "S",
  },
  {
    id: 8,
    text: "喜欢的人送了你一个小礼物。你的第一反应更像：",
    optionA: "会先想到这份礼物背后是不是有特别心意",
    optionB: "会先注意它是什么、怎么选的、什么时候准备的",
    _dim: "SN",
    _scoreA: "N",
    _scoreB: "S",
  },
  {
    id: 9,
    text: "你和喜欢的人一起看烟花。你更容易记住：",
    optionA: "当时的场景细节，比如风、声音、服装、表情",
    optionB: "那一刻带来的感觉和它以后可能代表的意义",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },
  {
    id: 10,
    text: "你发现某个人最近对你比以前温柔很多。你更会：",
    optionA: "从她具体做了什么来判断",
    optionB: "从整体氛围变化里感觉她是不是对你有好感",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },
  {
    id: 11,
    text: "准备文化祭约会企划时，你更倾向：",
    optionA: "想一个更特别、更有故事感的安排",
    optionB: "优先参考成熟稳健做法，确保流程顺畅",
    _dim: "SN",
    _scoreA: "N",
    _scoreB: "S",
  },
  {
    id: 12,
    text: "你和喜欢的人聊天时，对方说了一句有点暧昧的话。你更容易：",
    optionA: "先留意她说这句话时的语气、时机和上下文",
    optionB: "开始联想她背后的想法和关系走向",
    _dim: "SN",
    _scoreA: "S",
    _scoreB: "N",
  },

  // ── T / F ──
  {
    id: 13,
    text: "青梅竹马因为一件小事突然不高兴。你更可能先：",
    optionA: "先安抚她的情绪，让她别那么难受",
    optionB: "先弄清楚她到底为什么不高兴",
    _dim: "TF",
    _scoreA: "F",
    _scoreB: "T",
  },
  {
    id: 14,
    text: "朋友来问你该不该向喜欢的人表白。你更倾向：",
    optionA: "帮他分析时机、风险和成功率",
    optionB: "先理解他的心情，再鼓励他面对自己的真心",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 15,
    text: "你发现后辈明显对你有好感，但她最近状态不太稳。你更优先考虑：",
    optionA: "会用合适的分寸回应她，但优先处理彼此的情况",
    optionB: "会尝试把事情处理清楚，但更在意她当下的感受和状态",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 16,
    text: "约会时对方迟到了很久，看起来还很慌。你第一反应更像：",
    optionA: "先让她别紧张，表示没关系",
    optionB: "先问清发生了什么，安慰她只是出了意外",
    _dim: "TF",
    _scoreA: "F",
    _scoreB: "T",
  },
  {
    id: 17,
    text: "你喜欢的人和朋友闹矛盾，来找你倾诉。你更自然会：",
    optionA: "帮她理清谁的问题、怎么解决",
    optionB: "先陪她把委屈说完，再慢慢安慰她",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 18,
    text: "如果不得不拒绝一个对你有好感的人，你更倾向：",
    optionA: "虽然会一定程度上照顾对方情绪，但更优先把态度和理由说明白，别留下多余误会",
    optionB: "更在意表达方式是否柔和，别让对方太难堪",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },

  // ── J / P ──
  {
    id: 19,
    text: "终于约到喜欢的人周末出去。你通常会：",
    optionA: "提前查好路线、店、时间安排",
    optionB: "先把人约出来，到时顺着气氛决定",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 20,
    text: "第一次约会当天突然下雨，原计划全乱了。你更可能：",
    optionA: "很快换成备选安排，想办法把节奏稳住",
    optionB: "接受变化，干脆根据现场感觉重新玩",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 21,
    text: "你和喜欢的人聊天越来越暧昧。你更倾向：",
    optionA: "享受暧昧过程，不急着立刻定性",
    optionB: "想确认关系进度，不喜欢一直模糊",
    _dim: "JP",
    _scoreA: "P",
    _scoreB: "J",
  },
  {
    id: 22,
    text: "收到“今晚要不要出来走走？”这种临时邀约时，你更像：",
    optionA: "先确认时间地点和之后安排",
    optionB: "只要自己有空，通常会先出去，细节边走边定",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 23,
    text: "准备送喜欢的人生日礼物时，你通常会：",
    optionA: "提前想很久，早早选好和包装好",
    optionB: "一路看灵感，最后挑最有感觉的",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 24,
    text: "关系刚开始升温时，你更希望：",
    optionA: "保持自然发展，不想太早被框住",
    optionB: "节奏清晰一点，知道下一步大概怎么走",
    _dim: "JP",
    _scoreA: "P",
    _scoreB: "J",
  },
];



export const extendedQuestions: Question[] = [
  ...popularQuestions,
  { id: 25, text: "面对一段关系，你更在意：", optionA: "稳定可预期、细水长流", optionB: "新鲜刺激、心跳加速", _dim: "SR", _scoreA: "S", _scoreB: "R" },
  { id: 26, text: "约会计划更偏向：", optionA: "熟悉路线与稳妥安排", optionB: "尝试没去过的新地点", _dim: "SR", _scoreA: "S", _scoreB: "R" },
  { id: 27, text: "遇到感情分歧时你更可能：", optionA: "先把现实问题落地解决", optionB: "先追求情绪和氛围的突破", _dim: "SR", _scoreA: "S", _scoreB: "R" },
  { id: 28, text: "你理想中的相处节奏是：", optionA: "规律、安心、可持续", optionB: "多变、惊喜、充满火花", _dim: "SR", _scoreA: "S", _scoreB: "R" },
  { id: 29, text: "选礼物时你更倾向：", optionA: "实用耐用、长期有价值", optionB: "有趣特别、当下很惊艳", _dim: "SR", _scoreA: "S", _scoreB: "R" },
  { id: 30, text: "关于恋爱观你更认同：", optionA: "陪伴与稳定是第一位", optionB: "热烈与冲动也很重要", _dim: "SR", _scoreA: "S", _scoreB: "R" },
];

export function getQuestionsByMode(mode: QuizMode): Question[] {
  return mode === "extended" ? extendedQuestions : popularQuestions;
}

export function calculateMbti(answers: Answer[], mode: QuizMode = "popular"): MbtiResult {
  const questionBank = getQuestionsByMode(mode);
  const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, R: 0 };

  for (const ans of answers) {
    const q = questionBank.find(q => q.id === ans.questionId);
    if (!q) continue;
    const letter = ans.choice === "A" ? q._scoreA : q._scoreB;
    s[letter]++;
  }

  const eiT = s.E + s.I || 1;
  const snT = s.S + s.N || 1;
  const tfT = s.T + s.F || 1;
  const jpT = s.J + s.P || 1;
  const srT = s.S + s.R || 1;

  const ratios = { E: Math.round((s.E / eiT) * 100), I: Math.round((s.I / eiT) * 100), S: Math.round((s.S / snT) * 100), N: Math.round((s.N / snT) * 100), T: Math.round((s.T / tfT) * 100), F: Math.round((s.F / tfT) * 100), J: Math.round((s.J / jpT) * 100), P: Math.round((s.P / jpT) * 100), R: Math.round((s.R / srT) * 100) };
  const balanced = { EI: s.E === s.I, SN: s.S === s.N, TF: s.T === s.F, JP: s.J === s.P, SR: s.S === s.R };

  const getTieBreakLetter = (questionId: number, fallback: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P") => {
    const tieBreakAnswer = answers.find((ans) => ans.questionId === questionId);
    const tieBreakQuestion = questionBank.find((q) => q.id === questionId);
    if (!tieBreakAnswer || !tieBreakQuestion) return fallback;
    return tieBreakAnswer.choice === "A" ? tieBreakQuestion._scoreA : tieBreakQuestion._scoreB;
  };

  const mbti = [s.E > s.I ? "E" : s.E < s.I ? "I" : getTieBreakLetter(4, "I"), s.S > s.N ? "S" : s.S < s.N ? "N" : getTieBreakLetter(12, "N"), s.T > s.F ? "T" : s.T < s.F ? "F" : getTieBreakLetter(18, "F"), s.J > s.P ? "J" : s.J < s.P ? "P" : getTieBreakLetter(21, "P")].join("");

  const sr = mode === "extended" ? (s.S >= s.R ? "S" : "R") : undefined;
  return { mbti, scores: s, ratios, balanced, sr };
}
