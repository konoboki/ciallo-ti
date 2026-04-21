/**
 * Home - 首页
 * Design: 纯白背景 + Yuzusoft Logo 品牌风格
 * 柚子社暖橙色系，简洁优雅
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, BookOpen, ArrowRight, Star } from "lucide-react";

const YUZU_LOGO = `/cialloti-logo.jpg`;

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-yuzu/8 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-yuzu-leaf/6 blur-3xl" />

      {/* Header nav */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={YUZU_LOGO} alt="Yuzusoft" className="h-8 object-contain" />
          </div>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => navigate("/characters")}
              className="px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              角色图鉴
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="yuzu-btn text-sm !py-2 !px-5"
            >
              开始测试
            </button>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <main className="relative z-10 px-6 pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Text content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 yuzu-badge mb-6">
                  <Sparkles size={14} />
                  <span>Ciallo-ti</span>
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  你最适合和
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yuzu to-yuzu-dark">
                    哪位柚子社角色结婚？
                  </span>
                </h1>

                <p className="text-foreground/50 text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                  通过 24 道 galgame 情景测试，测出最适合与你结婚的柚子社女主。
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    onClick={() => navigate("/quiz")}
                    className="yuzu-btn text-base flex items-center justify-center gap-2 !px-8 !py-3.5"
                  >
                    开始测试
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => navigate("/characters")}
                    className="px-8 py-3.5 rounded-xl text-base font-semibold border border-border text-foreground/60 hover:text-foreground hover:border-foreground/20 hover:bg-muted transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen size={18} />
                    角色图鉴
                  </button>
                </div>

                {/* GitHub Star */}
                <div className="mt-6 flex flex-col items-center lg:items-start gap-1">
                  <a
                    href="https://github.com/konoboki/ciallo-ti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-all shadow-sm"
                  >
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    给项目 Star
                  </a>
                  <p className="text-xs text-foreground/40">球球了这对我真的很有帮助</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Logo showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-yuzu/20 to-yuzu-leaf/10 rounded-full blur-3xl scale-110" />
                <motion.img
                  src={YUZU_LOGO}
                  alt="Yuzusoft"
                  className="relative w-64 md:w-80 lg:w-96 object-contain drop-shadow-lg"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>


        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/40 mb-4">
            <span>ciallo_ti · 柚子社人格测试 (非官方粉丝作品)</span>
            <span>受到 <a href="https://acgti.tianxingleo.top" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/60 transition-colors">ACGTI</a> 和 <a href="https://www.bilibili.com/video/BV1LpDHByET6/?spm_id_from=333.337.search-card.all.click" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/60 transition-colors">SBTI</a> 启发</span>
          </div>
          <div className="text-xs text-foreground/30 text-center">
            <p>角色及作品版权归 YUZUSOFT 所有 | 本网站为非官方粉丝作品，仅供娱乐使用</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
