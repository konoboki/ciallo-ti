/**
 * 柚子社角色数据库
 * 只包含MBTI匹配表中的角色
 */

export type IdentityType = "S" | "R";

export interface Character {
  id: string;
  name: string;
  nameJa: string;
  game: string;
  mbti: string;
  characterMbti: string;
  identity: IdentityType;
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
    characterMbti: "ENFJ",
    identity: "S",
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
    characterMbti: "INTJ",
    identity: "R",
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
    characterMbti: "ENFP",
    identity: "S",
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
    characterMbti: "INFP",
    identity: "R",
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
    characterMbti: "INFJ",
    identity: "R",
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
    characterMbti: "ENTP",
    identity: "S",
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
    characterMbti: "ESFP",
    identity: "S",
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
    characterMbti: "ISFJ",
    identity: "S",
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
    characterMbti: "ISTJ",
    identity: "S",
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
    characterMbti: "ESFJ",
    identity: "S",
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
    characterMbti: "ISFJ",
    identity: "R",
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
    characterMbti: "ESFJ",
    identity: "S",
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
    characterMbti: "ISFJ",
    identity: "R",
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
    characterMbti: "INFP",
    identity: "R",
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
    characterMbti: "ISFJ",
    identity: "R",
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
    characterMbti: "INFJ",
    identity: "R",
    color: "#C5E8D5",
    image: `/characters/murasame.png`,
    description: 'INTP 会被丛雨这种 INFJ 型很容易戳中 INTP 最吃的那种点——安静、聪明、带一点疏离感，但其实一直在默默观察你、照顾你、把你的状态看在眼里。她一出场就是那种不喧闹、先看清局势再开口的人，而且不是单纯冷淡，而是有一种很稳的陪伴感。',
  },

  {
    id: "touko", name: "户隐憧子", nameJa: "戸隠 憧子", game: "魔女的夜宴", mbti: "蟑螂学姐", characterMbti: "INFJ", identity: "R", color: "#C5D5E8", image: "/characters/togakushi-touko.png", description: 'ENFP 很容易被户隐憧子这种 INFJ 型吸住。她不是一眼就能完全看透的角色，而是表面端正、可靠，内里有自己的压抑、距离感和深层思考。对 ENFP 来说，这种“看起来很稳，其实心里藏了很多”的人最容易激起靠近欲：你会想逗她、理解她、打开她，也会被她偶尔露出的脆弱和认真击中。',
  },
  { id: "noa", name: "白雪乃爱", nameJa: "白雪 乃愛", game: "天使☆嚣嚣 RE-BOOT!", mbti: "纯洁（？）天使", characterMbti: "ENFP", identity: "R", color: "#E8F0FF", image: "/characters/shirayuki-noa.png", description: 'INTJ 会被白雪乃爱这种 ENFP 型吸住，很大原因是她能把你原本冷静、封闭、只靠理性维持的世界突然点亮。她有很强的主动性和情绪感染力，又不是单纯热闹，而是带着一点天使感、纯粹感和想被理解的柔软。对 INTJ 来说，这种人会让关系不只是“合适”，而是变成一种会主动闯进你生活里的光。' },
  { id: "anju", name: "隐杏珠", nameJa: "隠 杏珠", game: "LimeLight Lemonade Jam", mbti: "闪光弹的主人", characterMbti: "ENFP", identity: "R", color: "#FFE8D5", image: "/characters/kakure-anju.png", description: 'ISFJ 会被隐杏珠这种 ENFP 型吸引，是因为她表面闪闪发光、很会带动气氛，内里却不是单纯没心没肺，而是有很多想被真正看见、真正认可的部分。对稳定、照顾型的 ISFJ 来说，这种人很容易激起保护欲和陪伴欲：你会觉得她很耀眼，但又不是遥不可及，而是一个需要被好好接住的女孩子。' },
  { id: "liliko", name: "二见原莉莉子", nameJa: "二見原 リリコ", game: "LimeLight Lemonade Jam", mbti: "绝世好青梅", characterMbti: "ESFP", identity: "S", color: "#FFD5C5", image: "/characters/futamihara-liliko.png", description: 'ISTJ 会被二见原莉莉子这种 ESFP 型很容易打中——她不是那种让你猜来猜去的人，而是会把热度、亲近感和青梅竹马式的熟悉感直接带到你面前。对偏克制、容易反复确认关系是否安全的 ISTJ 来说，莉莉子这种明亮、直率、会主动靠近又不太阴湿内耗的类型，会像一阵很真实的暖风，把你从过度思考里拉回日常。' },
  { id: "tsukimi", name: "岛越月望", nameJa: "島越 月望", game: "LimeLight Lemonade Jam", mbti: "奶黄包", characterMbti: "ESFJ", identity: "S", color: "#E8D5F5", image: "/characters/shimakoshi-tsukimi.png", description: 'ESTJ 会被岛越月望这种 ESFJ 型吸引，是因为她不只是温柔大小姐，而是有训练、有执行力、有责任感，还能在关键场合把事情做到位的人。ESTJ 很难只被单纯可爱打动，更容易欣赏那种稳定、体面、能长期坚持的人。月望的魅力就在于她既有关系感，又不是软弱依附型；对你来说，她像一个能一起把现实过好的人。' },
  { id: "koharu", name: "鞍马小春", nameJa: "鞍馬 小春", game: "千恋＊万花", mbti: "直接电吧", characterMbti: "ESFJ", identity: "S", color: "#F5D5E8", image: "/characters/kurama-koharu.png", description: 'ENFJ 会被鞍马小春这种 ESFJ 型吸引，是因为她外放、热情、容易给出回应，也能让关系很快变得有温度。ENFJ 本身很会照顾别人，但也会累，也会希望有人直接回应自己的情绪和付出。小春这种不会让气氛冷掉、会主动把生活变热闹的类型，会让你不用一直单方面照亮别人，而是也能被对方拉着往前走。' },
  { id: "elina", name: "艾莉娜·欧列格夫娜·欧文", nameJa: "DRACU-RIOT!", game: "DRACU-RIOT!", mbti: "工口娜", characterMbti: "ENFP", identity: "R", color: "#F5D5FF", image: "/characters/elina-owen.png", description: 'INFJ 很容易被艾莉娜这种 ENFP 型戳中。她表面是会开玩笑、会拱火、会把场面搅热的白毛吸血鬼，实际内核却很怕被拒绝，也很在意自己能不能被真正接受。对 INFJ 来说，她既能把你从安静的内心世界里拖出来，又会在熟悉之后露出敏感和不安，这种“外放壳 + 脆弱内核”的反差很有杀伤力。' },
  { id: "yuune", name: "天雾夕音", nameJa: "天霧 夕音", game: "天色＊アイルノーツ", mbti: "榨汁机", characterMbti: "ESFJ", identity: "R", color: "#E8C5D5", image: "/characters/amagiri-yuune.png", description: 'ISTP 会被天雾夕音这种 ESFJ 型打中，是因为她的照顾不是空泛的情绪表演，而是会具体落实到生活管理、料理、健康、陪伴和关系维护里。ISTP 本身不太喜欢高压绑定，但夕音这种“会主动照顾你、又把被需要感看得很重”的类型，会让你在不知不觉中习惯她的存在。对你来说，她像是一个会把混乱生活整理好、但也悄悄把你锁进关系里的大姐姐。' },
  { id: "kurumi", name: "小云雀来海", nameJa: "小雲雀 来海", game: "天使☆嚣嚣 RE-BOOT!", mbti: "角是用来干什么的", characterMbti: "ENTP", identity: "S", color: "#FFF0C5", image: "/characters/kohibari-kurumi.png", description: 'ENTP 会被小云雀来海这种 ENTP 型打中，是因为她能接住你的脑回路，也能反过来把场面推得更乱、更有趣。她不是那种只能被动接受你玩梗的人，而是会跟你一起拱火、一起跳脱、一起把关系推进到意想不到方向的人。对 ENTP 来说，这种同频但更外放、更稳定的类型，会让互动变成一种很上头的互相拆招。' },
  { id: "sana", name: "千岁佐奈", nameJa: "千歳 佐奈", game: "天神乱漫", mbti: "最棒的妹妹", characterMbti: "ISFJ", identity: "R", color: "#FFE8F0", image: "/characters/chitose-sana.png", description: 'ESFP 会被千岁佐奈这种 ISFJ 型戳中，是因为她的爱不是轰轰烈烈地抢镜，而是藏在照顾、陪伴、吃醋和长期依恋里。ESFP 虽然外在热闹，但在关系里也很需要明确的回应和安全感；佐奈这种会把喜欢藏在日常里、又因为太在意而容易不安的类型，会让你感觉自己是被认真放在心上的。对你来说，她的甜不是刺激，而是越靠近越舍不得放开的家人感。' },
  { id: "chihaya", name: "上坂茅羽耶", nameJa: "上坂 茅羽耶", game: "夏空彼方", mbti: "草帽飞向何方", characterMbti: "INFP", identity: "R", color: "#F5E8D5", image: "/characters/uesaka-chihaya.png", description: 'ISFP 会被上坂茅羽耶这种 INFP 型吸引，是因为她身上有很强的梦幻感、脆弱感和个人情绪深度。她不是强势推着你走的人，而是安静、柔软、带着一点会消失的透明感，让你忍不住想靠近、想理解、想把她从不安里拉住。对重视感受和氛围的 ISFP 来说，茅羽耶的魅力就在于她像一段很轻的梦，但情绪重量又真实得让人放不下。' },
  { id: "mayu", name: "式部茉优", nameJa: "式部 茉優", game: "RIDDLE JOKER", mbti: "0721青梅学姐", characterMbti: "ENTP", identity: "S", color: "#D5C5E8", image: "/characters/shikibu-mayu.png", description: 'ENTJ 会被式部茉优这种 ENTP 型打中，是因为她聪明、松弛、会玩梗，也不会被强势的人轻易压住。ENTJ 平时习惯掌控节奏，但茉优这种人会用轻快、跳脱、带一点恶作剧感的方式打乱你的控制感，让你觉得又麻烦又有趣。对你来说，她不是需要你管理的对象，而是一个能和你来回过招、让关系变得更有活气的人。' },
  { id: "tsumugi", name: "椎叶䌷", nameJa: "椎葉 紬", game: "魔女的夜宴", mbti: "“妈妈”", characterMbti: "ISFJ", identity: "R", color: "#D6ECFF", image: "/characters/shiiba-tsumugi.png", description: 'ISTJ 会被椎叶䌷这种 ISFJ 型戳中，是因为她温柔、认真、懂得照顾别人，同时又带着一点容易受伤和不太敢主动要求的内核。她不是会把生活搅乱的人，而是那种相处起来很稳定、很踏实，却会在关键时刻让你发现她其实一直在努力忍耐的人。对 ISTJ 来说，这种“安静可靠 + 柔软脆弱”的组合很容易变成长期陪伴感。' },
  { id: "miu", name: "矢来美羽", nameJa: "矢来 美羽", game: "DRACU-RIOT!", mbti: "花心了花心了花心了", characterMbti: "ESFJ", identity: "S", color: "#D5E8C5", image: "/characters/yarai-miu.png", description: 'INTP 会被矢来美羽这种 ESFJ 型打中，是因为她很会把关系里的温度直接表达出来，不会让你一直靠猜去判断对方的想法。对容易想太多、表达又偏慢的 INTP 来说，美羽这种高反应、高关系感、会吃醋也会主动靠近的类型，能把你从脑内分析拉回现实互动。她的魅力不在神秘，而在于你很清楚地感觉到：她真的在意你。' },
  { id: "reina", name: "蕾娜", nameJa: "レナ", game: "千恋＊万花", mbti: "大大大", characterMbti: "ENFP", identity: "S", color: "#FFD5E8", image: "/characters/reina.png", description: 'ESFJ 会被蕾娜这种 ENFP 型吸引，是因为她明亮、外放、反应快，能够很自然地回应你的热情，也能把关系里的空气变得更轻快。ESFJ 本来就重视互动和回应，而蕾娜不是冷淡难猜的类型，她会让你感觉自己的付出被接住，也会反过来给你很多活力和新鲜感。对你来说，她像一颗很会发光的糖，热闹但不失真。' },
  { id: "hazuki", name: "二条院羽月", nameJa: "二条院 羽月", game: "RIDDLE JOKER", mbti: "大和抚子", characterMbti: "ISFJ", identity: "S", color: "#E8E5C5", image: "/characters/nijouin-hazuki.png", description: 'ESTP 会被二条院羽月这种 ISFJ 型吸引，是因为她有很强的稳定感、礼仪感和长期陪伴感。ESTP 虽然外在行动力强，但内里也会需要一个不会被自己节奏带乱、能稳稳接住自己的人。羽月这种大和抚子式的端正和温柔，会让你一边想逗她、一边又会下意识收住分寸。对你来说，她像一个很稳的锚，让冲动也有了归处。' },
];

/**
 * 用户MBTI → 最适合结婚的角色
 */
export const popularMbtiToCharacterId: Record<string, string> = {
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
  ISTJ:  "tsumugi",
  ESTJ:  "suzuno",
  ISFP:  "rikka",
  ESFP:  "yoshino",
  ISTP:  "sumi",
  ESTP:  "mako",
};

export const playerTypeToCharacterId: Record<string, string> = {
  "ISTJ-S": "tsumugi", "ISTJ-R": "liliko", "ISFJ-S": "anju", "ISFJ-R": "kanade",
  "INFJ-S": "elina", "INFJ-R": "amane", "INTJ-S": "noa", "INTJ-R": "meguru",
  "ISTP-S": "yuune", "ISTP-R": "sumi", "ISFP-S": "chihaya", "ISFP-R": "rikka",
  "INFP-S": "mera-azusa", "INFP-R": "kanna", "INTP-S": "murasame", "INTP-R": "miu",
  "ESTP-S": "mako", "ESTP-R": "hazuki", "ESFP-S": "yoshino", "ESFP-R": "sana",
  "ENFP-S": "natsume", "ENFP-R": "touko", "ENTP-S": "nene", "ENTP-R": "kurumi",
  "ESTJ-S": "tsukimi", "ESTJ-R": "suzuno", "ESFJ-S": "reina", "ESFJ-R": "nanami",
  "ENFJ-S": "harumi-ena", "ENFJ-R": "koharu", "ENTJ-S": "ayase", "ENTJ-R": "mayu",
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

export function getMatchedCharacter(mbti: string, mode: "popular" | "extended" = "popular", identity: IdentityType = "S"): Character {
  const charId = mode === "extended" ? playerTypeToCharacterId[`${mbti}-${identity}`] : popularMbtiToCharacterId[mbti];
  const char = characters.find(c => c.id === charId);
  return char ?? characters[0];
}

export function getMatchDescription(mbti: string): string {
  return mbtiMatchDescription[mbti] ?? "";
}

export function getGameList(): string[] {
  return Array.from(new Set(characters.map(c => c.game)));
}
