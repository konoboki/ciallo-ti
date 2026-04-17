# ciallo_ti — 测试你最适合和哪个柚子社角色结婚

> 非官方粉丝作品 · 角色及作品版权归 YUZUSOFT 所有

**在线体验：** https://konoboki.github.io/ciallo-ti/

---

## 项目简介

ciallo_ti 是一个基于 MBTI 人格类型的柚子社（YUZUSOFT）Galgame 角色匹配测试网站。通过 24 道情境式二选一题目，测算你的 MBTI 类型，并匹配最适合你的柚子社角色。

---

## 题目设计与评分标准

### 答题方式

每题提供 **A / B 两个选项**，选择最符合自己的那个。题目以恋爱情境为背景，不显示维度标签，避免诱导作答。

### 维度划分

共 24 道题，每个维度各 6 题：

| 维度 | 含义 | A 选项倾向 | B 选项倾向 | 题号 |
|------|------|-----------|-----------|------|
| E/I | 外向 / 内向 | E（外向） | I（内向） | Q1–Q6 |
| S/N | 实感 / 直觉 | S（实感） | N（直觉） | Q7–Q12 |
| T/F | 思考 / 情感 | T（思考） | F（情感） | Q13–Q18 |
| J/P | 判断 / 感知 | J（判断） | P（感知） | Q19–Q24 |

### 计分规则

- 选 **A** → 正向维度（E / S / T / J）+1
- 选 **B** → 反向维度（I / N / F / P）+1

每个维度各自累计分数后进行比较：

```
E 总分 = Q1(A) + Q2(A) + Q3(A) + Q4(A) + Q5(A) + Q6(A) 中选 A 的数量
I 总分 = Q1(B) + Q2(B) + Q3(B) + Q4(B) + Q5(B) + Q6(B) 中选 B 的数量

如果 E > I → 判 E；如果 I > E → 判 I
```

其他维度同理（S vs N、T vs F、J vs P）。

### 倾向百分比

结果页展示每个维度的倾向百分比，例如：

```
外向倾向 = E得分 / (E得分 + I得分) × 100%
内向倾向 = 100% - 外向倾向
```

### 平分处理

若某维度两边得分相同（如 E=3, I=3），则：

- 显示「X/X 维度接近平衡，已取略偏方向」
- 默认偏向 **I / N / F / P**（内倾偏向）

---

## MBTI 与角色匹配表

| 你的 MBTI | 匹配角色 | 角色 MBTI | 所属作品 |
|-----------|---------|-----------|---------|
| INFP | 明月栞那 | ENFJ | RIDDLE JOKER |
| ENFP | 四季夏目 | INTJ | RIDDLE JOKER |
| INFJ | 谷风天音 | ENTP | 天使☆嚣嚣 RE-BOOT! |
| ENFJ | 三司绫濑 | INFP | RIDDLE JOKER |
| INTP | 明月栞那 | ENFJ | RIDDLE JOKER |
| ENTP | 绫地宁宁 | INFJ | 千恋万花 |
| INTJ | 因幡巡 | ENFP | RIDDLE JOKER |
| ENTJ | 三司绫濑 | INFP | RIDDLE JOKER |
| ISFJ | 仮屋和奏 | ESFP | 魔女的夜宴 |
| ESFJ | 在原七海 | ISFJ | 千恋万花 |
| ISTJ | 仮屋和奏 | ESFP | 魔女的夜宴 |
| ESTJ | 汐山凉音 | ISTJ | 星光咖啡馆与死神之蝶 |
| ISFP | 马庭芦花 | ESFJ | 千恋万花 |
| ESFP | 朝武芳乃 | ISFJ | 千恋万花 |
| ISTP | 墨染希 | ESFJ | 星光咖啡馆与死神之蝶 |
| ESTP | 常陆茉子 | ISFJ | 千恋万花 |

---

## 技术栈

- **框架：** React 19 + TypeScript
- **样式：** Tailwind CSS 4 + shadcn/ui
- **动画：** Framer Motion
- **路由：** Wouter（Hash 路由，兼容 GitHub Pages）
- **构建：** Vite 7
- **部署：** GitHub Pages（`gh-pages` 分支）

---

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建（GitHub Pages 模式）
GITHUB_PAGES=true pnpm build
```

---

## 免责声明

本项目为非官方粉丝作品，仅供娱乐。所有角色及作品版权归 **YUZUSOFT** 所有。
