/**
 * TypeWriter - 打字机文字效果
 * Design: Galgame UI - 模拟视觉小说逐字显示
 */
import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypeWriter({ text, speed = 40, onComplete, className = "" }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[1em] bg-yuzu-dark/60 ml-0.5 animate-pulse align-middle" />}
    </span>
  );
}
