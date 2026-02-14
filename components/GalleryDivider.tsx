"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";

const cards = [
  "/pict (1).jpeg",
  "/pict (2).jpeg",
  "/pict (3).jpeg",
  "/pict (4).jpeg",
  "/pict (5).jpeg",
  "/pict (6).jpeg",
  "/pict (7).jpeg",
  "/pict (8).jpeg",
  "/pict (9).jpeg",
  "/pict (10).jpeg",
  "/pict (11).jpeg",
  "/pict (12).jpeg",
  "/pict (13).jpeg",
  "/pict (14).jpeg",
];

function TiltCard({ src, index }: { src: string; index: number }) {
  return (
    <motion.div
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
      whileHover={{ rotateX: -10, rotateY: 10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <img src={src} className="w-full h-full object-cover" alt="" />
    </motion.div>
  );
}

export default function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const x = useMotionValue(0);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const totalWidth = rail.scrollWidth;
    const visibleWidth = rail.parentElement?.offsetWidth ?? 0;

    const distance = totalWidth - visibleWidth;

    if (distance <= 0) return;

    animationRef.current = animate(x, [0, -distance], {
      ease: "linear",
      duration: distance / 200, // speed factor (adjust)
      repeat: Infinity,
      repeatType: "reverse",
    });

    return () => animationRef.current?.stop();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 px-6"
      style={{
        background:
          "linear-gradient(145deg, hsl(215,85%,35%) 0%, hsl(213,75%,45%) 100%)",
      }}
    >
      {/* 🔥 PARTICLE / BACKGROUND LAYER */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden
      >
        <svg
          className="absolute w-full h-full opacity-[0.06]"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <path
            d="M0 200 Q300 120 600 200 T1200 180"
            fill="none"
            stroke="white"
            strokeWidth="3"
          />
          <path
            d="M0 220 Q300 140 600 220 T1200 200"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="12 8"
          />
          <path
            d="M0 300 Q400 220 800 280 T1200 260"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Cards layer */}
      <motion.div
        style={{ y: cardsY }}
        className="relative p-2 z-10 mb-20 overflow-hidden"
      >
        <motion.div
          ref={railRef}
          style={{ x }}
          onHoverStart={() => animationRef.current?.pause()}
          onHoverEnd={() => animationRef.current?.play()}
          className="flex gap-6 px-6 w-max"
        >
          {cards.map((src, i) => (
            <div key={i} className="shrink-0 w-[85vw] sm:w-[60vw] lg:w-[22rem]">
              <TiltCard src={src} index={i} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        style={{ y: textY }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Fasilitas yang Menakjubkan, Semua yang Anda Butuhkan
        </h2>

        <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
          Kami menyediakan berbagai fasilitas dan pelayanan yang memuaskan untuk
          membantu Anda mencapai tujuan Anda tanpa menghilangkan kenyamanan
          serta keaamanan anda.
        </p>
      </motion.div>
    </section>
  );
}
