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
    text: "放学路上，平时只偶尔见面的学妹主动朝你挥手打招呼。你更可能：",
    optionA: "礼貌回应，顺着她的节奏继续聊下去",
    optionB: "很自然地接上话，顺势多聊几句",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 2,
    text: "朋友把你拉去参加联谊，现场有个很可爱的转学生坐在你旁边。你通常会：",
    optionA: "主动找个轻松的话题切进去",
    optionB: "先感受一下她是不是愿意聊，再慢慢开口",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },
  {
    id: 3,
    text: "你被拉进一个小群，里面有你有点在意的人，群里气氛也不错。你更像：",
    optionA: "先看大家在聊什么，找到合适节点再发言",
    optionB: "很快就加入聊天，想到什么先说出来",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 4,
    text: "第一次和喜欢的人单独出去之后，你的感觉更接近：",
    optionA: "会想自己安静待一下，把刚才的感觉慢慢回味",
    optionB: "反而更有精神，还想继续和人待在一起",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 5,
    text: "文化祭分组时，和你同组的是几个不太熟的人，其中还有你有好感的对象。你会：",
    optionA: "主动带一下气氛，让大家更快熟起来",
    optionB: "先自然配合，熟一点以后再慢慢放开",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },
  {
    id: 6,
    text: "想和喜欢的人拉近距离时，你通常更像：",
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
    optionA: "那一刻的场景细节，比如风、声音、表情和周围环境",
    optionB: "那个瞬间带来的感觉，以及它以后可能代表什么",
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
    text: "准备文化祭约会企划时，你更倾向：",
    optionA: "想一个更特别、更有故事感的安排",
    optionB: "优先参考成熟做法，确保流程顺畅",
    _dim: "SN",
    _scoreA: "N",
    _scoreB: "S",
  },
  {
    id: 12,
    text: "和喜欢的人聊天时，对方说了一句有点意味深长的话。你更容易：",
    optionA: "先留意她说这句话时的语气、时机和上下文",
    optionB: "先去想她是不是在暗示什么更深的意思",
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
    optionA: "先把彼此的情况想清楚，用合适的分寸回应她",
    optionB: "会尝试事情能处理清楚，但更在意她当下的感受和状态",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },
  {
    id: 16,
    text: "约会时对方迟到了很久，看起来也很慌。你第一反应更像：",
    optionA: "先让她别紧张，表示人没事就好",
    optionB: "先确认发生了什么，看看是不是哪里出问题了",
    _dim: "TF",
    _scoreA: "F",
    _scoreB: "T",
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
    text: "如果不得不拒绝一个对你有好感的人，你更倾向：",
    optionA: "尽量把态度和理由说明白，别留下多余误会",
    optionB: "更在意表达方式是否柔和，别让对方太难堪",
    _dim: "TF",
    _scoreA: "T",
    _scoreB: "F",
  },

  // ── J / P ──
  {
    id: 19,
    text: "终于约到喜欢的人周末出去。你通常会：",
    optionA: "提前查好路线、店和时间安排",
    optionB: "先把人约出来，之后再顺着情况调整",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 20,
    text: "第一次约会当天突然下雨，原计划被打乱。你更像：",
    optionA: "很快换成备选安排，想办法把节奏稳住",
    optionB: "接受变化，干脆根据现场感觉重新玩",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 21,
    text: "和喜欢的人聊天越来越暧昧时，你更倾向：",
    optionA: "享受这种慢慢升温的过程，不急着立刻定性",
    optionB: "希望大概知道现在到哪一步了，不喜欢一直悬着",
    _dim: "JP",
    _scoreA: "P",
    _scoreB: "J",
  },
  {
    id: 22,
    text: "收到“今晚要不要出来走走？”这种临时邀约时，你更像：",
    optionA: "会先问一下大概去哪、多久、之后怎么安排",
    optionB: "只要自己有空，通常会先出去，细节边走边定",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 23,
    text: "准备送喜欢的人生日礼物时，你通常会：",
    optionA: "提前想很久，早早选好并准备妥当",
    optionB: "一边看灵感一边挑，最后选最有感觉的那个",
    _dim: "JP",
    _scoreA: "J",
    _scoreB: "P",
  },
  {
    id: 24,
    text: "关系刚开始升温时，你更希望：",
    optionA: "保持自然发展，不想太早被固定节奏",
    optionB: "节奏清晰一点，自己心里大概知道下一步怎么走",
    _dim: "JP",
    _scoreA: "P",
    _scoreB: "J",
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
