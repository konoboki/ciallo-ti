/**
 * StarParticles - 星光粒子背景效果
 * Design: Galgame UI - 夜空星光闪烁效果
 */
import { useEffect, useRef } from "react";

export default function StarParticles({ count = 60 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;

      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,200,150,0.4) 50%, transparent 100%);
        border-radius: 50%;
        animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
      `;
      container.appendChild(star);
      stars.push(star);
    }

    return () => {
      stars.forEach((s) => s.remove());
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
