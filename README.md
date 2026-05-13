# ciallo_ti — 测试你最适合和哪个柚子社角色结婚

> 非官方粉丝作品 · 角色及作品版权归 YUZUSOFT 所有

**在线体验：** https://ciallomeow.com

---

## 项目简介

ciallo_ti 是一个基于 MBTI 人格类型的柚子社Galgame 角色匹配测试网站。通过 24 道galgame情境式二选一题目，测算你的 MBTI 类型，并匹配最适合你的柚子社角色。

---

## 更新说明

v1.0.1
优化假屋和奏，芦花姐立绘

新增角色：阳见惠凪，布良梓

新增了github star导航

更新了ENFJ/ISTJ 匹配结果

新增了结果出现概率，由于栞那之前占两个结果位，现改成一个后出现概率/2

v1.1.0 
- 新增双入口测试模式：
  - `/quiz/popular`：热门角色测试（24 题 / 16 角色）
  - `/quiz/extended`：扩展角色测试（30 题 / 32 角色）
- 扩展模式新增第五维内部指标 **S/R（Stable / Reflective）**，仅用于内部匹配，不在结果页展示。
- 新增并整理扩展角色数据，角色总数提升至 **32**。
- 新增 32 组 `MBTI-S/R` 扩展映射，确保扩展模式可命中 32 个不同角色。
- 替换并优化部分基础题目文案，提升语义清晰度。
- 新增 6 道第五维题（Q25-Q30），热门模式不受影响。

- **扩展角色测试（Extended）**
  - 30 题（24 基础题 + 6 道 S/R 题）
  - 计算 EI / SN / TF / JP + S/R（内部）
  - 页面仍只展示 4 字母 MBTI
  - 内部使用 `MBTI-S/R` 映射 32 角色

---

## 题目设计与评分标准

### 答题方式

每题提供 **A / B 两个选项**，选择更符合自己的那个。题目以恋爱情境为背景，前台不显示维度标签，避免诱导作答。

本项目目前有两种测试模式：

- **热门角色测试（Popular）**：24 题，只计算 4 字母 MBTI，并匹配 16 个热门角色。
- **扩展角色测试（Extended）**：30 题，在 24 道基础 MBTI 题之外，额外加入 6 道 S/R 内部指标题，用于在同一 MBTI 下进一步区分扩展角色。

---

### 维度划分

#### Popular / Extended 共同使用的 24 道基础题

| 维度 | 含义 | 题号 |
|------|------|------|
| E/I | 外向 / 内向 | Q1–Q6 |
| S/N | 实感 / 直觉 | Q7–Q12 |
| T/F | 思考 / 情感 | Q13–Q18 |
| J/P | 判断 / 感知 | Q19–Q24 |

#### Extended 额外使用的 6 道内部题

| 维度 | 含义 | 题号 | 用途 |
|------|------|------|------|
| S/R | Stable / Reflective | Q25–Q30 | 仅用于扩展角色匹配，不在结果页展示为正式 MBTI 字母 |

---

### 基础 MBTI 计分规则

每道题按照代码中定义的 `_scoreA` / `_scoreB` 直接计分，选择 A 或 B 后，对应字母 +1。

#### E / I

- Q1：A → I，B → E
- Q2：A → E，B → I
- Q3：A → I，B → E
- Q4：A → I，B → E
- Q5：A → E，B → I
- Q6：A → E，B → I

#### S / N

- Q7：A → N，B → S
- Q8：A → N，B → S
- Q9：A → S，B → N
- Q10：A → S，B → N
- Q11：A → N，B → S
- Q12：A → S，B → N

#### T / F

- Q13：A → F，B → T
- Q14：A → T，B → F
- Q15：A → T，B → F
- Q16：A → F，B → T
- Q17：A → T，B → F
- Q18：A → T，B → F

#### J / P

- Q19：A → J，B → P
- Q20：A → J，B → P
- Q21：A → P，B → J
- Q22：A → J，B → P
- Q23：A → J，B → P
- Q24：A → P，B → J

每个维度内部单独比较两边得分，例如 E vs I、S vs N、T vs F、J vs P。分数更高的一边成为最终 MBTI 中对应位置的字母。

---

### 扩展模式 S/R 计分规则

扩展模式额外计算 Q25–Q30 的 S/R 内部指标。

- Q25：A → Stable，B → Reflective
- Q26：A → Stable，B → Reflective
- Q27：A → Stable，B → Reflective
- Q28：A → Stable，B → Reflective
- Q29：A → Stable，B → Reflective
- Q30：A → Stable，B → Reflective

S/R 不会改变页面展示的 4 字母 MBTI，只用于扩展模式下的角色匹配：

- Stable 分数更高 → 使用 `S` 分支角色
- Reflective 分数更高 → 使用 `R` 分支角色
- Stable 与 Reflective 平分 → 使用 Q28 决胜：
  - Q28 选 A → S
  - Q28 选 B → R

---

### 倾向百分比

结果页展示每个维度的倾向百分比，例如：

```
外向倾向 = E得分 / (E得分 + I得分) × 100%
内向倾向 = 100% - 外向倾向
```

### 平分处理

若某维度两边得分相同（如 E=3, I=3），则：

- 显示「X/X 维度接近平衡，已取略偏方向」
- 使用对应维度的决胜题：
  - **E/I 平手 → 看第 4 题**
  - **S/N 平手 → 看第 12 题**
  - **T/F 平手 → 看第 18 题**
  - **J/P 平手 → 看第 21 题**

决胜时直接按该题所选项对应的维度字母判定。

---

## MBTI 与角色匹配表

| 你的 MBTI | 匹配角色 | 角色 MBTI | 所属作品 |
|-----------|---------|-----------|---------|
| INFP | 明月栞那 | ENFJ | 星光咖啡馆与死神之蝶 |
| INTP | 丛雨 | INTJ | 千恋＊万花 |
| ENFP | 四季夏目 | INTJ | 星光咖啡馆与死神之蝶 |
| INTJ | 因幡巡 | ENFP | 魔女的夜宴 |
| ENTP | 绫地宁宁 | INFJ | 魔女的夜宴 |
| INFJ | 谷风天音 | ENTP | 天使☆嚣嚣 RE-BOOT! |
| ENFJ | 阳见惠凪 | INFP | LLLJ |
| ENTJ | 三司绫濑 | INFP | RIDDLE JOKER |
| ISFJ | 仮屋和奏 | ESFP | 魔女的夜宴 |
| ISTJ | 布良梓   | ISFJ | DRACU-RIOT! |
| ESFJ | 在原七海 | ISFJ | RIDDLE JOKER |
| ESTJ | 汐山凉音 | ISTJ | 星光咖啡馆与死神之蝶 |
| ISFP | 马庭芦花 | ESFJ | 千恋＊万花 |
| ESFP | 朝武芳乃 | ISFJ | 千恋＊万花 |
| ISTP | 墨染希 | ESFJ | 星光咖啡馆与死神之蝶 |
| ESTP | 常陆茉子 | ISFJ | 千恋＊万花 |

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | React 19 + TypeScript |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 动画 | Framer Motion |
| 路由 | Wouter |
| 构建工具 | Vite 7 |
| 部署平台 | Cloudflare Pages |
| 后端 API | Cloudflare Pages Functions |
| 数据库 | Cloudflare D1（SQLite） |

---

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器（Vite，访问 http://localhost:5173）
pnpm dev

# 构建
pnpm build   # 输出到 dist/public/

# TypeScript 类型检查
pnpm check
```

> 本地开发时 `/api/ratings/*` 接口不可用（需要 Cloudflare D1 环境），评分区域会静默降级显示为 0，不影响其他功能测试。

---

## 部署（Cloudflare Pages）

### 构建配置

| 项目 | 值 |
|------|----|  
| 构建命令 | `pnpm build` |
| 输出目录 | `dist` |
| Node.js 版本 | 22 |



### D1 数据库绑定

在 Cloudflare Pages 项目 → Settings → Bindings 中添加：

| 类型 | Variable name | 数据库 |
|------|--------------|--------|
| D1 database | `DB` | `ciallo-ti-ratings` |

数据库表由 `functions/api/ratings/[characterId].js` 在首次请求时自动创建，无需手动建表。

### Pages Functions API

`GET /api/ratings/:characterId` — 获取匹配次数和评分统计

`POST /api/ratings/:characterId` — 提交匹配记录（`action: "match"`）或评分（`action: "rate"`，需附 `rating` 和 `session_id`）

---

## 版权与致谢

### 版权声明

本项目为非官方粉丝作品，仅供娱乐使用，不用于任何商业目的。

- 所有游戏角色、剧情、美术资产的版权归 **株式会社 YUZUSOFT** 所有
- 角色信息参考自 [萌娘百科](https://zh.moegirl.org.cn/) 及 [YUZUSOFT 官方网站](https://www.yuzu-soft.com/)

⚠️ 本项目中涉及的二次元角色名称、人物设定及相关素材资源（包括但不限于立绘、图标等），其著作权、商标权及其他相关知识产权均归原权利人所有，包括但不限于相应的动画制作方、游戏开发商、发行方、插画师或其他合法权利主体。

本项目仅用于非商业性的学习、展示与同人交流，不对任何引用内容或相关角色 IP 主张所有权。除原创部分外，项目内出现的相关名称、形象与素材，其权利均归属于各自原作者或版权方。

如相关权利人认为本项目内容存在侵权或不当使用情况，请通过 Issue 与我联系。经核实后，我们将及时配合处理，包括但不限于修改、下架或删除相关内容。
### 致谢

本项目的设计与创意受到以下作品的启发：

- **[ACGTI](https://acgti.tianxingleo.top)** — 二次元角色人格测试网站，提供了设计参考
- **[SBTI](https://www.bilibili.com/video/BV1LpDHByET6/)** — B 站 SBTI 测试视频，提供了创意灵感

感谢以上创作者的开创性工作。
---

## 免责声明

本项目与 YUZUSOFT 官方无任何关联。所有角色名称、游戏标题均为其各自版权持有人的财产。本项目仅为粉丝创作，旨在向柚子社的优秀作品致敬。
