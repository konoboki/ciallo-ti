/**
 * ciallo_ti - 柚子社人格测试
 * 题目系统：24道二选一情境题
 * 每题 A 选项对应正向维度（E/S/T/J），B 选项对应反向维度（I/N/F/P）
 * 维度信息仅用于计分，不在 UI 中展示
 */

export type DimPair = "EI" | "SN" | "TF" | "JP";
export type Choice = "A" | "B";

export interface Question {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  /** 内部计分用，不在 UI 中显示 */
  _dim: DimPair;
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
    optionA: "立刻自然接话，顺势多聊两句",
    optionB: "礼貌回应，但会等对方继续带话题",
    _dim: "EI",
  },
  {
    id: 2,
    text: "朋友把你拉去参加联谊，现场有个很可爱的转学生坐在你旁边。你通常会：",
    optionA: "主动先开一个轻松的话题",
    optionB: "先观察她的反应，再决定说什么",
    _dim: "EI",
  },
  {
    id: 3,
    text: "你被拉进一个社团，里面有你有点在意的人。群里气氛很好。你更像：",
    optionA: "很快加入聊天，边说边想",
    optionB: "先看大家聊什么，再挑合适时机发言",
    _dim: "EI",
  },
  {
    id: 4,
    text: "第一次和喜欢的人单独出去后，你的感受更接近：",
    optionA: "聊完反而更来劲，还想继续相处",
    optionB: "相处很开心，但之后会想自己安静回味一下",
    _dim: "EI",
  },
  {
    id: 5,
    text: "文化祭分组时，和你同组的是几个不太熟的人，其中还有你有好感的对象。你会：",
    optionA: "主动带动气氛，让大家熟起来",
    optionB: "先低调配合，熟了以后再慢慢放开",
    _dim: "EI",
  },
  {
    id: 6,
    text: "你想向喜欢的人表达一点好感时，通常会：",
    optionA: "先通过互动和聊天自然拉近距离",
    optionB: "先确认自己想清楚了，再认真表达",
    _dim: "EI",
  },

  // ── S / N ──
  {
    id: 7,
    text: "第一次约会前，你更在意：",
    optionA: "时间、路线、吃什么、怎么走这些具体细节",
    optionB: "整体氛围会不会特别、能不能留下记忆点",
    _dim: "SN",
  },
  {
    id: 8,
    text: "喜欢的人送了你一个小礼物。你的第一反应更像：",
    optionA: "注意它是什么、怎么挑的、什么时候准备的",
    optionB: "忍不住猜这里面是不是藏着特别的意义",
    _dim: "SN",
  },
  {
    id: 9,
    text: "你和喜欢的人一起看烟花。你更容易记住：",
    optionA: "当时的场景细节，比如风、声音、服装、表情",
    optionB: "那一刻带来的感觉和它以后可能代表的意义",
    _dim: "SN",
  },
  {
    id: 10,
    text: "你发现某个人最近对你比以前温柔很多。你更会：",
    optionA: "从她具体做了什么来判断",
    optionB: "从整体氛围变化里感觉她是不是对你有意思",
    _dim: "SN",
  },
  {
    id: 11,
    text: "准备文化祭约会企划时，你更倾向：",
    optionA: "优先参考成熟做法，确保流程顺畅",
    optionB: "想一个更特别、更有故事感的安排",
    _dim: "SN",
  },
  {
    id: 12,
    text: "你和喜欢的人聊天时，对方说了一句有点暧昧的话。你更容易：",
    optionA: "关注她说这句话时的语气、时机和上下文",
    optionB: "开始联想她背后的想法和关系走向",
    _dim: "SN",
  },

  // ── T / F ──
  {
    id: 13,
    text: "青梅竹马因为一件小事突然不高兴。你更可能先：",
    optionA: "弄清楚她到底为什么生气",
    optionB: "先安抚她的情绪，让气氛缓和",
    _dim: "TF",
  },
  {
    id: 14,
    text: "朋友来问你该不该向喜欢的人表白。你更倾向：",
    optionA: "帮他分析时机、风险和成功率",
    optionB: "先理解他的心情，再鼓励他面对真心",
    _dim: "TF",
  },
  {
    id: 15,
    text: "你发现后辈明显喜欢你，但她现在状态不太稳定。你更看重：",
    optionA: "边界要清楚，避免事情变复杂",
    optionB: "处理方式要尽量温柔，不想伤她太重",
    _dim: "TF",
  },
  {
    id: 16,
    text: "约会时对方迟到了很久，看起来还很慌。你第一反应更像：",
    optionA: "先想知道原因，判断是不是安排出了问题",
    optionB: "先让她别紧张，表示没关系",
    _dim: "TF",
  },
  {
    id: 17,
    text: "你喜欢的人和朋友闹矛盾，来找你倾诉。你更自然会：",
    optionA: "帮她理清谁的问题、怎么解决",
    optionB: "先接住她的情绪，让她觉得被理解",
    _dim: "TF",
  },
  {
    id: 18,
    text: "如果不得不拒绝一个对你有好感的人，你更倾向：",
    optionA: "说清楚理由，避免留下误会",
    optionB: "注意措辞和方式，尽量减少她受伤的感觉",
    _dim: "TF",
  },

  // ── J / P ──
  {
    id: 19,
    text: "终于约到喜欢的人周末出去。你通常会：",
    optionA: "提前查好路线、店、时间安排",
    optionB: "先把人约出来，到时顺着气氛决定",
    _dim: "JP",
  },
  {
    id: 20,
    text: "第一次约会当天突然下雨，原计划全乱了。你更可能：",
    optionA: "立刻切换成备选方案",
    optionB: "干脆随现场感觉走，看看会发生什么",
    _dim: "JP",
  },
  {
    id: 21,
    text: "你和喜欢的人聊天越来越暧昧。你更倾向：",
    optionA: "想确认关系进度，不喜欢一直模糊",
    optionB: "享受暧昧过程，不急着立刻定性",
    _dim: "JP",
  },
  {
    id: 22,
    text: "收到\u201c今晚要不要出来走走？\u201d这种临时邀约时，你更像：",
    optionA: "先确认时间地点和之后安排",
    optionB: "先答应再说，细节路上慢慢定",
    _dim: "JP",
  },
  {
    id: 23,
    text: "准备送喜欢的人生日礼物时，你通常会：",
    optionA: "提前想很久，早早选好和包装好",
    optionB: "去市场乱逛，最后挑最有感觉的",
    _dim: "JP",
  },
  {
    id: 24,
    text: "关系刚开始升温时，你更希望：",
    optionA: "知道下一步大概怎么走",
    optionB: "保持自然发展",
    _dim: "JP",
  },
];

/**
 * 根据答案计算 MBTI 类型
 * 选 A → 正向维度（E/S/T/J）+1
 * 选 B → 反向维度（I/N/F/P）+1
 * 平分时默认偏向 I/N/F/P（内倾偏向）
 */
export function calculateMbti(answers: Answer[]): MbtiResult {
  const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const ans of answers) {
    const q = questions.find(q => q.id === ans.questionId);
    if (!q) continue;
    if (ans.choice === "A") {
      if (q._dim === "EI") s.E++;
      if (q._dim === "SN") s.S++;
      if (q._dim === "TF") s.T++;
      if (q._dim === "JP") s.J++;
    } else {
      if (q._dim === "EI") s.I++;
      if (q._dim === "SN") s.N++;
      if (q._dim === "TF") s.F++;
      if (q._dim === "JP") s.P++;
    }
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
