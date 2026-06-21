import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatProps {
  value: string;
  suffix?: string;
  label: string;
  delay?: number;
}

const AnimatedStat = ({ value, suffix = "", label, delay = 0 }: StatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    const isDecimal = value.includes(".");
    const duration = 2000;
    const startTime = Date.now();

    const timer = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Expo out easing
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = numericValue * eased;
        
        if (isDecimal) {
          setDisplayValue(current.toFixed(1));
        } else {
          setDisplayValue(Math.floor(current).toString());
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-12 px-6"
    >
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-5xl md:text-6xl font-light text-foreground ">
          {displayValue}
        </span>
        <span className="text-2xl md:text-3xl font-light text-primary">
          {suffix}
        </span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground uppercase tracking-widest font-mono">
        {label}
      </p>
    </motion.div>
  );
};

export const StatisticsRibbon = () => {
  const stats = [
    { value: "20", suffix: "+", label: "Standardized Protocols" },
    { value: "99.9", suffix: "%", label: "Calculation Accuracy" },
    { value: "15", suffix: "k+", label: "Cross-Institutional Syncs" },
  ];

  return (
    <section>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
