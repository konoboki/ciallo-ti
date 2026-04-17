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
}

export const characters: Character[] = [
  { id: "kanna",    name: "明月栞那", nameJa: "明月 栞那",  game: "星光咖啡馆与死神之蝶", mbti: "ENFJ", color: "#D5E8C5" },
  { id: "natsume",  name: "四季夏目", nameJa: "四季 ナツメ", game: "星光咖啡馆与死神之蝶", mbti: "INTJ", color: "#E8C5C5" },
  { id: "meguru",   name: "因幡巡",  nameJa: "因幡 めぐる", game: "魔女的夜宴",           mbti: "ENFP", color: "#FFD5C5" },
  { id: "ayase",    name: "三司绫濑", nameJa: "三司 綾瀬",  game: "RIDDLE JOKER",         mbti: "INFP", color: "#C5D5E8" },
  { id: "nene",     name: "绫地宁宁", nameJa: "綾地 寧々",  game: "魔女的夜宴",           mbti: "INFJ", color: "#E8C5D5" },
  { id: "amane",    name: "谷风天音", nameJa: "谷風 天音",  game: "天使☆嚣嚣 RE-BOOT!",  mbti: "ENTP", color: "#FFE8D5" },
  { id: "kanade",   name: "仮屋和奏", nameJa: "仮屋 和奏",  game: "魔女的夜宴",           mbti: "ESFP", color: "#FFF0C5" },
  { id: "nanami",   name: "在原七海", nameJa: "在原 七海",  game: "RIDDLE JOKER",         mbti: "ISFJ", color: "#E8E5C5" },
  { id: "suzuno",   name: "汐山凉音", nameJa: "汐山 涼音",  game: "星光咖啡馆与死神之蝶", mbti: "ISTJ", color: "#C5D8E8" },
  { id: "rikka",    name: "马庭芦花", nameJa: "馬庭 芦花",  game: "DRACU-RIOT!",          mbti: "ESFJ", color: "#E8C5D8" },
  { id: "yoshino",  name: "朝武芳乃", nameJa: "朝武 芳乃",  game: "千恋＊万花",           mbti: "ISFJ", color: "#E8D5F5" },
  { id: "sumi",     name: "墨染希",  nameJa: "墨染 希",    game: "星光咖啡馆与死神之蝶", mbti: "ESFJ", color: "#D5C5E8" },
  { id: "mako",     name: "常陆茉子", nameJa: "常陸 茉子",  game: "千恋＊万花",           mbti: "ISFJ", color: "#C5E8D5" },
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
