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
  image?: string;
}

export const characters: Character[] = [
  {
    id: "kanna",
    name: "明月栞那",
    nameJa: "明月 栞那",
    game: "星光咖啡馆与死神之蝶",
    mbti: "花洒的主人",
    color: "#D5E8C5",
    image: `/characters/mitsuki-kanna.png`,
    description: 'INFP / INTP 往往会被那种"懂你的情绪、又能温柔把你拉回现实"的人打动。明月栞那身上最强的是很外放的照顾欲和关系感：会用做饭、安抚、提醒、鼓励这种很具体的方式去接住别人，还会敏锐察觉对方什么时候在往负面里陷。对你来说，这种既温柔又主动的感觉，很像把你心里那团乱糟糟的感受轻轻整理好。',
  },
  {
    id: "natsume",
    name: "四季夏目",
    nameJa: "四季 ナツメ",
    game: "星光咖啡馆与死神之蝶",
    mbti: "钝钝钝器",
    color: "#E8C5C5",
    image: `/characters/shiki-natsume.png`,
    description: 'ENFP 很容易被"表面冷、内里认真，而且有自己标准的人"吸过去。四季夏目那种会紧张、会害羞、对自己要求高、在事情上很认真但感情上不轻易外露的气质，正好会让你觉得又神秘又想靠近。你喜欢去撬开别人冷静外壳，夏目这种克制感、反差感、还有一点笨拙可爱的地方，杀伤力就很强。',
  },
  {
    id: "meguru",
    name: "因幡巡",
    nameJa: "因幡 めぐる",
    game: "魔女的夜宴",
    mbti: "CIALLO",
    color: "#FFD5C5",
    image: `/characters/inaba-meguru.png`,
    description: 'INTJ 往往会被 ENFP 那种明亮、灵活、会把气氛带活的人吸引。因幡巡对你的吸引点就很明确：会主动靠近、会制造互动、让本来很自我封闭的你被迫参与现实和情绪流动。你喜欢聪明但不死板的人，而她的魅力恰好就是"热情里带机灵，乱中有活力"。',
  },
  {
    id: "ayase",
    name: "三司绫濑",
    nameJa: "三司 綾瀬",
    game: "RIDDLE JOKER",
    mbti: "锉刀",
    color: "#C5D5E8",
    image: `/characters/mitsuji-ayase.png`,
    description: 'ENFJ / ENTJ 往往会被"内里非常真、很有自己情感世界"的人吸引。三司绫濑对你的吸引力就在于：她不是来和你拼掌控、拼效率的，而是用一种非常柔软、真诚、带个人信念感的方式，让你感觉到另一种活法。你表面强，内里其实很容易对这种柔软但不廉价的真心起反应。',
  },
  {
    id: "nene",
    name: "绫地宁宁",
    nameJa: "綾地 寧々",
    game: "魔女的夜宴",
    mbti: "0721",
    color: "#E8C5D5",
    image: `/characters/ayachi-nene.png`,
    description: 'ENTP 常常最吃"表面安静、其实看人很深"的类型。宁宁的核心魅力就在于她不是普通的温柔，而是那种高敏感、会观察关系边界、能从互动模式直接看出一个人有问题的感觉；再加上她长期背负很多、内里压抑又自我牺牲，会让你很想去试探她、逗她、看她真正松开的样子。简单说，就是太有"深度感"和"可被打开感"了。',
  },
  {
    id: "amane",
    name: "谷风天音",
    nameJa: "谷風 天音",
    game: "天使☆嚣嚣 RE-BOOT!",
    mbti: "实妹",
    color: "#FFE8D5",
    image: `/characters/tanezawa-amane.png`,
    description: 'INFJ 常会被那种又聪明又会撩、还能把自己从壳里拽出来的人吸引。谷风天音很典型地有那种"会主动制造场面、会吃醋、会试探、会临场想点子"的味道，比如装脚扭到让男主背、直球表达占有欲、把关系往前推。对你来说，这种人会让世界突然变得更有活气，也会让你原本压着不说的话更容易流出来。',
  },
  {
    id: "kanade",
    name: "假屋和奏",
    nameJa: "仮屋 和奏",
    game: "魔女的夜宴",
    mbti: "brave man",
    color: "#FFF0C5",
    image: `/characters/kariya-kazusa.png`,
    description: 'ISFJ / ISTJ 会被和奏这种"嘴上炸、心里热、现场感很强"的人吸引，因为她能把原本很稳很收的生活一下子点亮。和奏的气质很明显：情绪外显、动作快、讲义气、重感情、反应都在当下，而且喜欢和别扭都会直接变成真实反应。对你来说，这种人像一团热闹的火，既有趣又不虚。',
  },
  {
    id: "nanami",
    name: "在原七海",
    nameJa: "在原 七海",
    game: "RIDDLE JOKER",
    mbti: "治愈之光",
    color: "#E8E5C5",
    image: `/characters/aihara-nanami.png`,
    description: 'ESFJ 很容易喜欢"同样重视照顾、稳定、责任，但更安静更踏实"的人。在原七海会买菜做饭、陪着出任务、还会给男主开补习班式的照看，本质上很有那种把关心落实到日常的味道。对你来说，这种人不是刺激型，而是"过日子会很顺、很安心、很彼此体谅"的类型。',
  },
  {
    id: "suzuno",
    name: "汐山凉音",
    nameJa: "汐山 涼音",
    game: "星光咖啡馆与死神之蝶",
    mbti: "土豆地雷",
    color: "#C5D8E8",
    image: `/characters/shioyama-suzune.png`,
    description: 'ESTJ 喜欢的稳定，不只是"听话"，而是"靠谱、能做事、遇事能顶"。汐山凉音最明显的就是专业、踏实、博学、会把事情落地：能从描述里准确判断蛋糕种类，接单之后就开始练习制作，也会一直讨论新品和具体经营。对你来说，这种人的魅力非常直接：不用猜、不拖沓、能一起把现实过好。',
  },
  {
    id: "rikka",
    name: "马庭芦花",
    nameJa: "馬庭 芦花",
    game: "千恋＊万花",
    mbti: "芦花姐",
    color: "#E8C5D8",
    image: `/characters/maniwa-ashika.png`,
    description: 'ISFP 往往容易被会主动表达关心、把人拉进关系里的人吸引。马庭芦花的气质很强：照顾店面、照顾客人、撮合互动、会开玩笑也会反击，整个人很像会把一个场子撑起来的大姐头。对你来说，这种外放的温暖特别有安全感，因为她会替你把很多你不想说破的关系需求直接做出来。',
  },
  {
    id: "yoshino",
    name: "朝武芳乃",
    nameJa: "朝武 芳乃",
    game: "千恋＊万花",
    mbti: "鸡蛋加糖",
    color: "#E8D5F5",
    image: `/characters/yoshino.png`,
    description: '鸡蛋烧就得加糖，ESFP 容易喜欢那种"看起来规矩温顺，但其实很认真、很能扛、感情又很真"的人。芳乃一方面很有责任心，会一直练舞、一直坚持巫女职责，另一方面又会因为被认可而害羞、会想把喜悦传递给对方、会在感情上笨拙又真诚。对你来说，这种人很甜，因为你越靠近，越能看到她认真外表下面很柔软的心。',
  },
  {
    id: "sumi",
    name: "墨染希",
    nameJa: "墨染 希",
    game: "星光咖啡馆与死神之蝶",
    mbti: "青梅竹马",
    color: "#D5C5E8",
    image: `/characters/suminoe-nozomi.png`,
    description: '小希可爱捏，ISTP 常会被"把情绪外显、把关系说清、把照顾直接做出来"的人吸引。墨染希对你的吸引点就会是典型互补：你本来偏冷、偏独处、偏问题解决，而她会主动制造人与人之间的热度，让你不用自己去组织亲密关系，也能被自然地拉进来。',
  },
  {
    id: "mako",
    name: "常陆茉子",
    nameJa: "常陸 茉子",
    game: "千恋＊万花",
    mbti: "上流忍者",
    color: "#C5E8D5",
    image: `/characters/hitachi-motoko.png`,
    description: 'ESTP 虽然爱冲，但很容易对"稳、忠诚、关键时刻不掉链子"的人产生强烈好感。茉子很冷静、把职责看得很重、会做家务、会在混乱时第一时间稳住局面。对你来说，这种人像稳定后方：你往前冲的时候，她不是拖你后腿，而是能接住你。',
  },
  {
    id: "harumi-ena",
    name: "阳见惠凪",
    nameJa: "陽見 恵凪",
    game: "limelight lemonade jam",
    mbti: "花Q",
    color: "#FFD6E7",
    image: `/characters/harumi-ena.png`,
    description: 'ENFJ 会被惠凪这种 INFP 型很容易戳中——安静怕生、情感很深、表面柔软，内里却有很强的执念和真心。她不是张扬外放的类型，而是那种明明胆怯，却会为了真正喜欢的东西拼命往前走的人。对 ENFJ 来说，这种“值得理解、值得保护、照亮后会更耀眼”的感觉会非常致命。',
  },
  {
    id: "mera-azusa",
    name: "布良梓",
    nameJa: "めら あずさ",
    game: "DRACU-RIOT!",
    mbti: "上午三次，下午三次",
    color: "#D6ECFF",
    image: `/characters/mera-azusa.png`,
    description: '上三下三，一周五天，喵喵嘴萝莉真是太棒了；ISTJ 会被布良梓这种 ISFJ 型戳中，因为她刚好是那种会主动贴近你、把气氛带暖，但又不会乱掉的人。她本身安静、认真、有分寸，平时还有点害羞，可一旦熟起来就会很自然地照顾你、关心你，让人慢慢放下戒备。对偏克制慢热的 ISTJ 来说，这种温柔、善良、可靠，又带一点可爱慌乱感的类型会很有杀伤力。',
  },
  {
    id: "murasame",
    name: "丛雨",
    nameJa: "ムラサメ",
    game: "千恋＊万花",
    mbti: "幼刀萝莉",
    color: "#C5E8D5",
    image: `/characters/murasame.png`,
    description: 'INTP 会被丛雨这种 INFJ 型很容易戳中 INTP 最吃的那种点——安静、聪明、带一点疏离感，但其实一直在默默观察你、照顾你、把你的状态看在眼里。她一出场就是那种不喧闹、先看清局势再开口的人，而且不是单纯冷淡，而是有一种很稳的陪伴感。',
  },
];

/**
 * 用户MBTI → 最适合结婚的角色（扩展模式）
 */
export const mbtiToCharacter: Record<string, string> = {
  INFP:  "kanna",
  ENFP:  "natsume",
  INFJ:  "amane",
  ENFJ:  "harumi-ena",
  INTP:  "murasame",
  ENTP:  "nene",
  INTJ:  "meguru",
  ENTJ:  "ayase",
  ISFJ:  "kanade",
  ESFJ:  "nanami",
  ISTJ:  "mera-azusa",
  ESTJ:  "suzuno",
  ISFP:  "rikka",
  ESFP:  "yoshino",
  ISTP:  "sumi",
  ESTP:  "mako",
};

export const popularMbtiToCharacterId: Record<string, string> = {
  INFP: "kanna",
  ENFP: "natsume",
  INFJ: "amane",
  ENFJ: "harumi-ena",
  INTP: "murasame",
  ENTP: "nene",
  INTJ: "meguru",
  ENTJ: "ayase",
  ISFJ: "kanade",
  ESFJ: "nanami",
  ISTJ: "tsumugi",
  ESTJ: "suzuno",
  ISFP: "rikka",
  ESFP: "yoshino",
  ISTP: "sumi",
  ESTP: "mako",
};

/**
 * 用户MBTI → 配对描述（结果页展示）
 */
export const mbtiMatchDescription: Record<string, string> = {
  INFP: '你可能会被明月栞那这种温柔又主动的人吸引。她很会照顾别人的情绪，也很擅长把关心变成具体行动，对容易把感受藏在心里的 INFP 来说，会有一种"终于有人真的接住我"的安心感。',
  ENFP: '你可能会被四季夏目这种冷静、克制、带点距离感的人吸引。她不是热闹型，但越接近越能发现她认真、敏感又有标准的一面，这种"外冷内热"（六套战神）的反差，对喜欢挖掘他人内心的 ENFP 很有吸引力。',
  INFJ: "你可能会被谷风天音这种聪明、会撩、又很会制造互动感的人吸引。她会主动打破僵局，也会把关系往前推一步，对习惯压住情绪的 INFJ 来说，这种人很容易让自己慢慢卸下防备。",
  ENFJ: 'ENFJ 会被惠凪这种 INFP 型很容易戳中——安静怕生、情感很深、表面柔软，内里却有很强的执念和真心。她不是张扬外放的类型，而是那种明明胆怯，却会为了真正喜欢的东西拼命往前走的人。对 ENFJ 来说，这种"值得理解、值得保护、照亮后会更耀眼"的感觉会非常致命。',
  INTP: "因为丛雨这种 INFJ 型很容易戳中 INTP 最吃的那点——安静、聪明、带一点疏离感，但其实一直在默默观察你、照顾你、把你的状态看在眼里。她一出场就是那种不喧闹、先看清局势再开口的人，而且不是单纯冷淡，而是有一种很稳的陪伴感：对 INTP 来说，这种人很有吸引力，因为她不是靠热闹来压你，而是用一种理解感、深度感、安定感把你慢慢拉近。",
  ENTP: "你简直就是一块桌角! ENTP可能会被绫地宁宁这种表面温柔安静、其实很有洞察力的人吸引。她不是单纯的好相处，而是那种能一眼看穿别人状态、内在又很深的人，这种复杂感和神秘感，通常很能勾起 ENTP 的兴趣。",
  INTJ: 'ciallo (∠·ω )⌒★你可能会被因幡巡这种有活力、会主动靠近、能把气氛带活的人吸引。她能为偏克制的 INTJ 带来更多情绪流动和生活感，让关系从"理性理解"变成"真的有温度"。',
  ENTJ: "你可能会被三司绫濑这种柔软（大概？）、真诚、有自己情感世界的人吸引。她和高掌控感的人形成鲜明对比，正因为不强势、不套路，反而更容易让 ENTJ 真正放下防备。",
  ISFJ: "你可能会被假屋和奏这种外放、直率、很有现场感的人吸引。她会把情绪直接表现出来，热闹、鲜活、很有存在感，对习惯稳定节奏的 ISFJ 来说，这种人会像一道突然闯进来的光。",
  ESFJ: "你可能会被在原七海这种温柔、可靠、适合长期相处的人吸引。她的魅力不在刺激感，而在踏实和体贴，会照顾人、会过日子、也会把关心落到细节里，很容易让 ESFJ 觉得安心。",
  ISTJ: '上三下三，一周五天，喵喵嘴萝莉真是太棒了；ISTJ 会被布良梓这种 ISFJ 型戳中，因为她刚好是那种会主动贴近你、把气氛带暖，但又不会乱掉的人。她本身安静、认真、有分寸，平时还有点害羞，可一旦熟起来就会很自然地照顾你、关心你，让人慢慢放下戒备。对偏克制慢热的 ISTJ 来说，这种温柔、善良、可靠，又带一点可爱慌乱感的类型会很有杀伤力。',
  ESTJ: "你可能会被汐山凉音这种踏实、专业、能把事情做好的人吸引。她给人的感觉是稳定、可靠、清楚自己在做什么，这种成熟和执行力，对重视现实感与秩序感的 ESTJ 特别有吸引力。",
  ISFP: "你可能会被马庭芦花这种热情、会照顾人、很有关系感的人吸引。她会主动带动气氛，也会把关心说出来、做出来，对不太喜欢主动争取关系的 ISFP 来说，很容易产生被看见、被珍惜的感觉。",
  ESFP: "你可能会被朝武芳乃这种认真、温柔、带一点害羞感的人吸引。她表面规矩克制，内里却很真诚、很细腻，这种安静又有分量的可爱感，往往会让 ESFP 很想靠近。",
  ISTP: "你可能会被墨染希这种会主动表达关心、擅长维系关系的人吸引。她能够弥补 ISTP 在情感表达上的保留，让互动更自然、更有温度，也更容易让人放松下来。",
  ESTP: '你可能会被常陆茉子这种冷静、稳得住、关键时刻很可靠的人吸引。她不像表面看起来那么单薄，而是很能扛事、很有责任感，这种"你往前冲、她能接得住"的感觉，对 ESTP 特别有魅力。',
};

export function getMatchedCharacter(mbti: string, mode: "popular" | "extended" = "popular"): Character {
  const table = mode === "extended" ? mbtiToCharacter : popularMbtiToCharacterId;
  const charId = table[mbti];
  const char = characters.find(c => c.id === charId);
  return char ?? characters[0];
}

export function getMatchDescription(mbti: string): string {
  return mbtiMatchDescription[mbti] ?? "";
}

export function getGameList(): string[] {
  return Array.from(new Set(characters.map(c => c.game)));
}
