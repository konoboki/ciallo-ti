/**
 * MBTI人格测试题目
 * Design: Galgame UI 拟态设计 - 以对话选项形式呈现
 * 每道题测试一个MBTI维度: E/I, S/N, T/F, J/P
 */

export interface QuizOption {
  text: string;
  dimension: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: [QuizOption, QuizOption];
  dimension: "EI" | "SN" | "TF" | "JP";
}

export const questions: QuizQuestion[] = [
  // E/I 维度 (4题)
  {
    id: 1,
    scenario: "放学后的教室里，同学们在讨论周末的安排……",
    question: "周末到了，你更倾向于？",
    options: [
      { text: "约上朋友一起去游乐园或者逛街，热闹最重要！", dimension: "E" },
      { text: "一个人窝在家里看番剧或者玩游戏，安静最舒服。", dimension: "I" },
    ],
    dimension: "EI",
  },
  {
    id: 2,
    scenario: "学园祭即将到来，班级需要准备节目……",
    question: "在学园祭的准备中，你通常会？",
    options: [
      { text: "主动站出来组织大家，分配任务，活跃气氛。", dimension: "E" },
      { text: "默默做好自己负责的部分，不太想当众发言。", dimension: "I" },
    ],
    dimension: "EI",
  },
  {
    id: 3,
    scenario: "在咖啡馆里，你正在享受下午茶时光……",
    question: "一个不太熟的同学突然坐到你对面想聊天，你会？",
    options: [
      { text: "开心地和对方聊起来，认识新朋友总是好事。", dimension: "E" },
      { text: "虽然会礼貌回应，但内心希望能继续享受独处时光。", dimension: "I" },
    ],
    dimension: "EI",
  },
  {
    id: 4,
    scenario: "社团活动结束后，大家提议一起去吃饭……",
    question: "连续参加了好几天的社团活动后，你感觉？",
    options: [
      { text: "精力充沛！和大家在一起让我充满能量。", dimension: "E" },
      { text: "有点累了，需要一个人的时间来恢复精力。", dimension: "I" },
    ],
    dimension: "EI",
  },
  // S/N 维度 (4题)
  {
    id: 5,
    scenario: "语文课上，老师布置了一篇关于「未来」的作文……",
    question: "写作文时，你更倾向于？",
    options: [
      { text: "从现实出发，描述具体可行的未来计划和目标。", dimension: "S" },
      { text: "展开想象，描绘一个充满奇幻色彩的未来世界。", dimension: "N" },
    ],
    dimension: "SN",
  },
  {
    id: 6,
    scenario: "你在温泉街散步时，发现了一把插在石头里的古刀……",
    question: "面对这把神秘的古刀，你的第一反应是？",
    options: [
      { text: "仔细观察刀的材质和年代，思考它的历史价值。", dimension: "S" },
      { text: "脑海中浮现各种传说故事，想象拔出刀后会发生什么。", dimension: "N" },
    ],
    dimension: "SN",
  },
  {
    id: 7,
    scenario: "朋友向你推荐了一款新的Galgame……",
    question: "选择游戏时，你更看重？",
    options: [
      { text: "画面质量、配音水平、系统流畅度等具体品质。", dimension: "S" },
      { text: "剧情深度、世界观设定、角色的内心成长。", dimension: "N" },
    ],
    dimension: "SN",
  },
  {
    id: 8,
    scenario: "在旅行中，你来到了一个陌生的小镇……",
    question: "探索这个小镇时，你会？",
    options: [
      { text: "按照旅游攻略一个个打卡推荐景点。", dimension: "S" },
      { text: "随心所欲地闲逛，期待发现隐藏的惊喜。", dimension: "N" },
    ],
    dimension: "SN",
  },
  // T/F 维度 (4题)
  {
    id: 9,
    scenario: "好朋友因为考试失利而心情低落……",
    question: "你会怎么安慰TA？",
    options: [
      { text: "帮TA分析失分原因，制定下次的复习计划。", dimension: "T" },
      { text: "先陪TA聊天散心，让TA知道你一直在身边。", dimension: "F" },
    ],
    dimension: "TF",
  },
  {
    id: 10,
    scenario: "班级要选出参加合唱比赛的成员，但名额有限……",
    question: "如果你是负责人，你会怎么选？",
    options: [
      { text: "公平地进行试唱选拔，选出实力最强的人。", dimension: "T" },
      { text: "尽量照顾每个人的感受，想办法让更多人参与。", dimension: "F" },
    ],
    dimension: "TF",
  },
  {
    id: 11,
    scenario: "你发现一个很亲近的人对你说了谎……",
    question: "你的第一反应是？",
    options: [
      { text: "冷静分析对方说谎的原因和动机。", dimension: "T" },
      { text: "感到受伤和失望，质疑这段关系的信任基础。", dimension: "F" },
    ],
    dimension: "TF",
  },
  {
    id: 12,
    scenario: "在做一个重要决定的时候……",
    question: "你更依赖什么来做判断？",
    options: [
      { text: "客观的利弊分析和逻辑推理。", dimension: "T" },
      { text: "内心的感受和对他人的影响。", dimension: "F" },
    ],
    dimension: "TF",
  },
  // J/P 维度 (4题)
  {
    id: 13,
    scenario: "明天就要期末考试了……",
    question: "你的备考状态是？",
    options: [
      { text: "早就按计划复习完了，今晚可以放松一下。", dimension: "J" },
      { text: "还在临时抱佛脚，但总觉得这样反而效率更高。", dimension: "P" },
    ],
    dimension: "JP",
  },
  {
    id: 14,
    scenario: "暑假到了，你有一整个月的自由时间……",
    question: "你会怎么安排？",
    options: [
      { text: "列出详细的计划表，每天都有明确的安排。", dimension: "J" },
      { text: "走一步看一步，保持灵活，说不定会有更好的机会。", dimension: "P" },
    ],
    dimension: "JP",
  },
  {
    id: 15,
    scenario: "你的房间现在是什么状态？",
    question: "关于整理房间，你的态度是？",
    options: [
      { text: "东西都有固定的位置，保持整洁让我很安心。", dimension: "J" },
      { text: "虽然看起来有点乱，但我知道每样东西在哪里。", dimension: "P" },
    ],
    dimension: "JP",
  },
  {
    id: 16,
    scenario: "和朋友约好了周末出去玩……",
    question: "关于行程安排，你更喜欢？",
    options: [
      { text: "提前规划好路线和时间表，确保一切顺利。", dimension: "J" },
      { text: "到了再说，随机应变才是旅行的乐趣所在。", dimension: "P" },
    ],
    dimension: "JP",
  },
];

export interface MbtiScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export function calculateMbti(answers: Record<number, string>): string {
  const scores: MbtiScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  Object.values(answers).forEach((dimension) => {
    scores[dimension as keyof MbtiScores]++;
  });

  const mbti = [
    scores.E >= scores.I ? "E" : "I",
    scores.S >= scores.N ? "S" : "N",
    scores.T >= scores.F ? "T" : "F",
    scores.J >= scores.P ? "J" : "P",
  ].join("");

  return mbti;
}
