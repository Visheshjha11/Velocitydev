import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING...");

  useEffect(() => {
    // Check if the environment is a bot/crawler/preview-tool
    const isBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|headless|webdriver/i.test(navigator.userAgent) || (window as any).navigator.webdriver;
    
    if (isBot) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 1.5 + 0.5;
        const next = prev + increment;
        
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const messages = [
      "INITIALIZING VELOCITY OS...",
      "LOADING CORE MODULES...",
      "CALIBRATING FLOW ENGINE...",
      "ESTABLISHING TELEMETRY...",
      "READY"
    ];
    const index = Math.min(Math.floor((progress / 100) * messages.length), messages.length - 1);
    setStatus(messages[index]);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[9999] bg-[#111111] flex flex-col items-center justify-center font-mono"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      
      <div className="flex flex-col items-center gap-10 relative z-10">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-2.5 h-2.5 bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]" 
          />
          <motion.span 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] tracking-[0.5em] font-bold text-[var(--primary)]"
          >
            VELOCITY.DEV
          </motion.span>
        </div>
        
        {/* Progress Section */}
        <div className="w-[240px] flex flex-col gap-3">
          <div className="h-[1px] w-full bg-[var(--primary)]/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[var(--primary)] shadow-[0_0_12px_var(--primary)]"
              style={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.05 }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[9px] tracking-[0.2em] uppercase">
            <motion.span 
              key={status}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 0.6, x: 0 }}
              className="text-[var(--primary)]"
            >
              {status}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-[var(--primary)]/20" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-[var(--primary)]/20" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-[var(--primary)]/20" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-[var(--primary)]/20" />
    </motion.div>
  );
}
