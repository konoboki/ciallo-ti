/**
 * ciallo_ti - 柚子社人格测试
 * 题目系统：24道二选一情境题
 * 维度信息仅用于计分，不在 UI 中展示
 */

export type QuizMode = "popular" | "extended";

export type DimPair = "EI" | "SN" | "TF" | "JP" | "SR";
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
  mode: QuizMode;
  scores: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number; stable: number; reflective: number };
  ratios: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number; stable: number; reflective: number };
  balanced: { EI: boolean; SN: boolean; TF: boolean; JP: boolean; SR: boolean };
}

export const questions: Question[] = [
  // ── E / I ──
  {
    id: 1,
    text: "放学路上，平时只偶尔见面的学妹主动朝你挥手打招呼。你更可能：",
    optionA: "礼貌回应，但会等对方继续带话题",
    optionB: "自然接话，顺势补一句近况或玩笑",
    _dim: "EI",
    _scoreA: "I",
    _scoreB: "E",
  },
  {
    id: 2,
    text: "朋友把你拉去参加联谊，现场有个很可爱的转学生坐在你旁边。你通常会：",
    optionA: "用现场的话题先轻松搭一句话",
    optionB: "先观察她的反应，再决定说什么",
    _dim: "EI",
    _scoreA: "E",
    _scoreB: "I",
  },
  {
    id: 3,
    text: "你被拉进一个小群，里面有你有点在意的人。群里气氛很好。你更像：",
    optionA: "先看几轮大家在聊什么，再找自然的时机发言",
    optionB: "看到能接上的话题就顺手回应，先让自己融进去",
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
    optionA: "会想到这份礼物是不是代表了某种特别心意",
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
    optionA: "先听清楚事情经过，再帮她理清问题和下一步怎么做",
    optionB: "先陪她把委屈说出来，让她情绪缓下来",
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
    optionA: "很快切到室内备选安排，让约会节奏继续稳住",
    optionB: "把下雨当成临时剧情，现场找附近有趣的地方",
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
    optionA: "保持自然发展，不急着马上定义关系",
    optionB: "对节奏有把握，知道下一步大概怎么走",
    _dim: "JP",
    _scoreA: "P",
    _scoreB: "J",
  },
];


export type IdentityLabel = "STABLE" | "REFLECTIVE";

export interface IdentityQuestion {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  _dim: "SR";
  _scoreA: "STABLE";
  _scoreB: "REFLECTIVE";
}

export const identityQuestions = [
  { id: 25, text: "和喜欢的人约会结束后，对方只回了一句“今天挺开心的”。你更可能：", optionA: "觉得这已经是不错的回应，不会过度多想", optionB: "思考她是不是只是客套，哪里还能做得更好", _dim: "SR", _scoreA: "STABLE", _scoreB: "REFLECTIVE" },
  { id: 26, text: "你精心准备的聊天话题，对方反应比你预想中冷淡。你通常会：", optionA: "先接受这次气氛一般，下次再聊", optionB: "马上回想自己是不是说错了话，开始分析原因", _dim: "SR", _scoreA: "STABLE", _scoreB: "REFLECTIVE" },
  { id: 27, text: "朋友说你和某个同学很般配，但也顺口吐槽了你一个缺点。你更像：", optionA: "听听就过，不太会因为一句评价影响自己", optionB: "会考虑自己是不是确实该改", _dim: "SR", _scoreA: "STABLE", _scoreB: "REFLECTIVE" },
  { id: 28, text: "喜欢的人突然几小时没回消息，但之前相处一直正常。你的第一反应更接近：", optionA: "她大概只是有事，等她有空再说", optionB: "会想是不是自己哪里让她不舒服了", _dim: "SR", _scoreA: "STABLE", _scoreB: "REFLECTIVE" },
  { id: 29, text: "文化祭表演前，你被安排到一个比较重要的位置。你更可能：", optionA: "相信已有准备，正式上场前时把注意力放在稳定发挥上", optionB: "临场前再整理一遍细节，让自己对每一步更有把握", _dim: "SR", _scoreA: "STABLE", _scoreB: "REFLECTIVE" },
  { id: 30, text: "关系逐渐变近，但还没有正式说破。你更舒服的状态是：", optionA: "保持稳定相处，让关系顺着日常慢慢发展", optionB: "细细感受彼此的变化，在合适的时候调整距离感", _dim: "SR", _scoreA: "STABLE", _scoreB: "REFLECTIVE" },
] as const satisfies ReadonlyArray<IdentityQuestion>;

export const extendedQuestions: Question[] = [...questions, ...identityQuestions as unknown as Question[]];

export function getQuestionsByMode(mode: QuizMode): Question[] {
  return mode === "extended" ? extendedQuestions : questions;
}

/**
 * 根据答案计算 MBTI 类型
 * 按题目定义计分：每题的 A/B 选项对应指定维度字母 +1
 * 平分时使用指定题目作为决胜题：EI 看 Q4、SN 看 Q12、TF 看 Q18、JP 看 Q21
 */
export function calculateMbti(answers: Answer[], mode: QuizMode = "popular"): MbtiResult {
  const activeQuestions = getQuestionsByMode(mode);
  const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, stable: 0, reflective: 0 };

  for (const ans of answers) {
    const q = activeQuestions.find(q => q.id === ans.questionId);
    if (!q) continue;
    if (q._dim === "SR") {
      if (ans.choice === "A") s.stable++;
      if (ans.choice === "B") s.reflective++;
      continue;
    }
    const letter = ans.choice === "A" ? q._scoreA : q._scoreB;
    s[letter as keyof typeof s]++;
  }

  const eiT = s.E + s.I || 1;
  const snT = s.S + s.N || 1;
  const tfT = s.T + s.F || 1;
  const jpT = s.J + s.P || 1;

  const srT = s.stable + s.reflective || 1;

  const ratios = {
    E: Math.round((s.E / eiT) * 100),
    I: Math.round((s.I / eiT) * 100),
    S: Math.round((s.S / snT) * 100),
    N: Math.round((s.N / snT) * 100),
    T: Math.round((s.T / tfT) * 100),
    F: Math.round((s.F / tfT) * 100),
    J: Math.round((s.J / jpT) * 100),
    P: Math.round((s.P / jpT) * 100),
    stable: Math.round((s.stable / srT) * 100),
    reflective: Math.round((s.reflective / srT) * 100),
  };

  const balanced = {
    EI: s.E === s.I,
    SN: s.S === s.N,
    TF: s.T === s.F,
    JP: s.J === s.P,
    SR: mode === "extended" ? s.stable === s.reflective : false,
  };

  // 平分时使用决胜题：EI 看 Q4、SN 看 Q12、TF 看 Q18、JP 看 Q21
  const getTieBreakLetter = (questionId: number, fallback: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P") => {
    const tieBreakAnswer = answers.find((ans) => ans.questionId === questionId);
    const tieBreakQuestion = activeQuestions.find((q) => q.id === questionId);
    if (!tieBreakAnswer || !tieBreakQuestion) return fallback;
    return tieBreakAnswer.choice === "A" ? tieBreakQuestion._scoreA : tieBreakQuestion._scoreB;
  };

  const mbti = [
    s.E > s.I ? "E" : s.E < s.I ? "I" : getTieBreakLetter(4, "I"),
    s.S > s.N ? "S" : s.S < s.N ? "N" : getTieBreakLetter(12, "N"),
    s.T > s.F ? "T" : s.T < s.F ? "F" : getTieBreakLetter(18, "F"),
    s.J > s.P ? "J" : s.J < s.P ? "P" : getTieBreakLetter(21, "P"),
  ].join("");

  return { mbti, mode, scores: s, ratios, balanced };
}
