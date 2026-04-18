/**
 * 柚子社角色数据库
 * 只包含MBTI匹配表中的角色
 */

export interface Character {
  id: string;
  name: string;
  nameJa: string;
  game: string;
  mbti: string;
  color: string;
  description?: string;
}

export const characters: Character[] = [
  {
    id: "kanna",
    name: "明月栞那",
    nameJa: "明月 栞那",
    game: "星光咖啡馆与死神之蝶",
    mbti: "ENFJ",
    color: "#D5E8C5",
    description: 'INFP / INTP 往往会被那种“懂你的情绪、又能温柔把你拉回现实”的人打动。明月栞那身上最强的是很外放的照顾欲和关系感：会用做饭、安抚、提醒、鼓励这种很具体的方式去接住别人，还会敏锐察觉对方什么时候在往负面里陷。对你来说，这种既温柔又主动的感觉，很像把你心里那团乱糟糟的感受轻轻整理好。',
  },
  {
    id: "natsume",
    name: "四季夏目",
    nameJa: "四季 ナツメ",
    game: "星光咖啡馆与死神之蝶",
    mbti: "INTJ",
    color: "#E8C5C5",
    description: 'ENFP 很容易被“表面冷、内里认真，而且有自己标准的人”吸过去。四季夏目那种会紧张、会害羞、对自己要求高、在事情上很认真但感情上不轻易外露的气质，正好会让你觉得又神秘又想靠近。你喜欢去撬开别人冷静外壳，夏目这种克制感、反差感、还有一点笨拙可爱的地方，杀伤力就很强。',
  },
  {
    id: "meguru",
    name: "因幡巡",
    nameJa: "因幡 めぐる",
    game: "魔女的夜宴",
    mbti: "ENFP",
    color: "#FFD5C5",
    description: 'INTJ 往往会被 ENFP 那种明亮、灵活、会把气氛带活的人吸引。因幡巡对你的吸引点就很明确：会主动靠近、会制造互动、让本来很自我封闭的你被迫参与现实和情绪流动。你喜欢聪明但不死板的人，而她的魅力恰好就是“热情里带机灵，乱中有活力”。',
  },
  {
    id: "ayase",
    name: "三司绫濑",
    nameJa: "三司 綾瀬",
    game: "RIDDLE JOKER",
    mbti: "INFP",
    color: "#C5D5E8",
    description: 'ENFJ / ENTJ 往往会被“内里非常真、很有自己情感世界”的人吸引。三司绫濑对你的吸引力就在于：她不是来和你拼掌控、拼效率的，而是用一种非常柔软、真诚、带个人信念感的方式，让你感觉到另一种活法。你表面强，内里其实很容易对这种柔软但不廉价的真心起反应。',
  },
  {
    id: "nene",
    name: "绫地宁宁",
    nameJa: "綾地 寧々",
    game: "魔女的夜宴",
    mbti: "INFJ",
    color: "#E8C5D5",
    description: 'ENTP 常常最吃“表面安静、其实看人很深”的类型。宁宁的核心魅力就在于她不是普通的温柔，而是那种高敏感、会观察关系边界、能从互动模式直接看出一个人有问题的感觉；再加上她长期背负很多、内里压抑又自我牺牲，会让你很想去试探她、逗她、看她真正松开的样子。简单说，就是太有“深度感”和“可被打开感”了。',
  },
  {
    id: "amane",
    name: "谷风天音",
    nameJa: "谷風 天音",
    game: "天使☆嚣嚣 RE-BOOT!",
    mbti: "ENTP",
    color: "#FFE8D5",
    description: 'INFJ 常会被那种又聪明又会撩、还能把自己从壳里拽出来的人吸引。谷风天音很典型地有那种“会主动制造场面、会吃醋、会试探、会临场想点子”的味道，比如装脚扭到让男主背、直球表达占有欲、把关系往前推。对你来说，这种人会让世界突然变得更有活气，也会让你原本压着不说的话更容易流出来。',
  },
  {
    id: "kanade",
    name: "仮屋和奏",
    nameJa: "仮屋 和奏",
    game: "魔女的夜宴",
    mbti: "ESFP",
    color: "#FFF0C5",
    description: 'ISFJ / ISTJ 会被和奏这种“嘴上炸、心里热、现场感很强”的人吸引，因为她能把原本很稳很收的生活一下子点亮。和奏的气质很明显：情绪外显、动作快、讲义气、重感情、反应都在当下，而且喜欢和别扭都会直接变成真实反应。对你来说，这种人像一团热闹的火，既有趣又不虚。',
  },
  {
    id: "nanami",
    name: "在原七海",
    nameJa: "在原 七海",
    game: "RIDDLE JOKER",
    mbti: "ISFJ",
    color: "#E8E5C5",
    description: 'ESFJ 很容易喜欢“同样重视照顾、稳定、责任，但更安静更踏实”的人。在原七海会买菜做饭、陪着出任务、还会给男主开补习班式的照看，本质上很有那种把关心落实到日常的味道。对你来说，这种人不是刺激型，而是“过日子会很顺、很安心、很彼此体谅”的类型。',
  },
  {
    id: "suzuno",
    name: "汐山凉音",
    nameJa: "汐山 涼音",
    game: "星光咖啡馆与死神之蝶",
    mbti: "ISTJ",
    color: "#C5D8E8",
    description: 'ESTJ 喜欢的稳定，不只是“听话”，而是“靠谱、能做事、遇事能顶”。汐山凉音最明显的就是专业、踏实、博学、会把事情落地：能从描述里准确判断蛋糕种类，接单之后就开始练习制作，也会一直讨论新品和具体经营。对你来说，这种人的魅力非常直接：不用猜、不拖沓、能一起把现实过好。',
  },
  {
    id: "rikka",
    name: "马庭芦花",
    nameJa: "馬庭 芦花",
    game: "DRACU-RIOT!",
    mbti: "ESFJ",
    color: "#E8C5D8",
    description: 'ISFP 往往容易被会主动表达关心、把人拉进关系里的人吸引。马庭芦花的气质很强：照顾店面、照顾客人、撮合互动、会开玩笑也会反击，整个人很像会把一个场子撑起来的大姐头。对你来说，这种外放的温暖特别有安全感，因为她会替你把很多你不想说破的关系需求直接做出来。',
  },
  {
    id: "yoshino",
    name: "朝武芳乃",
    nameJa: "朝武 芳乃",
    game: "千恋＊万花",
    mbti: "ISFJ",
    color: "#E8D5F5",
    description: 'ESFP 容易喜欢那种“看起来规矩温顺，但其实很认真、很能扛、感情又很真”的人。芳乃一方面很有责任心，会一直练舞、一直坚持巫女职责，另一方面又会因为被认可而害羞、会想把喜悦传递给对方、会在感情上笨拙又真诚。对你来说，这种人很甜，因为你越靠近，越能看到她认真外表下面很柔软的心。',
  },
  {
    id: "sumi",
    name: "墨染希",
    nameJa: "墨染 希",
    game: "星光咖啡馆与死神之蝶",
    mbti: "ESFJ",
    color: "#D5C5E8",
    description: 'ISTP 常会被“把情绪外显、把关系说清、把照顾直接做出来”的人吸引。墨染希对你的吸引点就会是典型互补：你本来偏冷、偏独处、偏问题解决，而她会主动制造人与人之间的热度，让你不用自己去组织亲密关系，也能被自然地拉进来。',
  },
  {
    id: "mako",
    name: "常陆茉子",
    nameJa: "常陸 茉子",
    game: "千恋＊万花",
    mbti: "ISFJ",
    color: "#C5E8D5",
    description: 'ESTP 虽然爱冲，但很容易对“稳、忠诚、关键时刻不掉链子”的人产生强烈好感。茉子很冷静、把职责看得很重、会做家务、会在混乱时第一时间稳住局面。对你来说，这种人像稳定后方：你往前冲的时候，她不是拖你后腿，而是能接住你。',
  },
];

/**
 * 用户MBTI → 最适合结婚的角色
 */
export const mbtiToCharacter: Record<string, string> = {
  INFP:  "kanna",
  ENFP:  "natsume",
  INFJ:  "amane",
  ENFJ:  "ayase",
  INTP:  "kanna",
  ENTP:  "nene",
  INTJ:  "meguru",
  ENTJ:  "ayase",
  ISFJ:  "kanade",
  ESFJ:  "nanami",
  ISTJ:  "kanade",
  ESTJ:  "suzuno",
  ISFP:  "rikka",
  ESFP:  "yoshino",
  ISTP:  "sumi",
  ESTP:  "mako",
};

export function getMatchedCharacter(mbti: string): Character {
  const charId = mbtiToCharacter[mbti];
  const char = characters.find(c => c.id === charId);
  return char ?? characters[0];
}

export function getGameList(): string[] {
  return Array.from(new Set(characters.map(c => c.game)));
}
