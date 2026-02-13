"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={ref}
      id="tentang"
      className="relative overflow-hidden py-32 px-6"
      style={{
        background:
          "linear-gradient(145deg, hsl(215, 85%, 35%) 0%, hsl(213, 75%, 45%) 100%)",
      }}
    >
      {/* Parallax background illustration */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <svg
          className="absolute w-full h-full opacity-[0.06]"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          {/* Road / highway lines */}
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

          {/* City silhouette hint */}
          <rect
            x="100"
            y="100"
            width="20"
            height="80"
            rx="2"
            fill="white"
            opacity="0.4"
          />
          <rect
            x="130"
            y="120"
            width="16"
            height="60"
            rx="2"
            fill="white"
            opacity="0.3"
          />
          <rect
            x="155"
            y="90"
            width="22"
            height="90"
            rx="2"
            fill="white"
            opacity="0.35"
          />

          <rect
            x="900"
            y="110"
            width="18"
            height="70"
            rx="2"
            fill="white"
            opacity="0.35"
          />
          <rect
            x="925"
            y="130"
            width="14"
            height="50"
            rx="2"
            fill="white"
            opacity="0.3"
          />
          <rect
            x="948"
            y="100"
            width="20"
            height="80"
            rx="2"
            fill="white"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        style={{ y: textY }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-primary-foreground text-balance leading-tight"
        >
          Menghubungkan Kota, Mendekatkan Keluarga
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-lg text-primary-foreground/70 leading-relaxed max-w-xl mx-auto"
        >
          Sejak tahun 2015, kami telah melayani ribuan penumpang dengan dedikasi
          penuh. Perjalanan bukan sekadar berpindah tempat, tetapi pengalaman
          yang menyenangkan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-8"
        >
          {[
            { value: "50+", label: "Rute" },
            { value: "10K+", label: "Penumpang" },
            { value: "10+", label: "Tahun Beroperasi" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-primary-foreground/60">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
