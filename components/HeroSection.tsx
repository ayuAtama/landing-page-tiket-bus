"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Bus,
  Clock,
  Shield,
  Star,
  ChevronDown,
} from "lucide-react";

// Deterministic pseudo-random number generator to avoid hydration mismatches
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const PARTICLE_DATA = (() => {
  const rng = seededRandom(42);
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(rng() * 100).toFixed(4)}%`,
    top: `${(rng() * 100).toFixed(4)}%`,
    size: `${(3 + rng() * 4).toFixed(4)}px`,
    driftX: `${((rng() - 0.5) * 80).toFixed(4)}px`,
    driftY: `${(-20 - rng() * 60).toFixed(4)}px`,
    duration: `${(6 + rng() * 6).toFixed(4)}s`,
    delay: `${(rng() * 6).toFixed(4)}s`,
    opacity: `${(0.15 + rng() * 0.25).toFixed(4)}`,
  }));
})();

function Particles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLE_DATA.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary-foreground/30 animate-particle-drift"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            // @ts-expect-error css custom properties
            "--drift-x": p.driftX,
            "--drift-y": p.driftY,
            "--duration": p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function RouteLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox="0 0 1200 700"
    >
      <path
        d="M0 350 Q300 200 600 350 T1200 350"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 6"
        className="text-primary-foreground"
      />
      <path
        d="M0 450 Q400 300 800 450 T1200 350"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 8"
        className="text-primary-foreground"
      />
      <path
        d="M0 250 Q200 400 500 250 T1200 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 10"
        className="text-primary-foreground"
      />
      {/* Route dots */}
      <circle cx="150" cy="330" r="5" className="fill-primary-foreground/30" />
      <circle cx="600" cy="350" r="6" className="fill-primary-foreground/30" />
      <circle cx="900" cy="380" r="4" className="fill-primary-foreground/30" />
    </svg>
  );
}

function BackgroundPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Dot grid pattern */}
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="white" opacity="0.07" />
        </pattern>
        {/* Diagonal lines pattern */}
        <pattern
          id="diag-lines"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="20"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.04"
          />
        </pattern>
        {/* Radial highlight behind bus */}
        <radialGradient
          id="bus-glow"
          cx="75%"
          cy="50%"
          r="35%"
          fx="75%"
          fy="50%"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      <rect width="100%" height="100%" fill="url(#diag-lines)" />
      <rect width="100%" height="100%" fill="url(#bus-glow)" />
    </svg>
  );
}

function HeroBusIllustration() {
  return (
    <motion.div
      className="absolute right-0 bottom-0 hidden lg:flex items-end justify-end pointer-events-none"
      style={{ width: "50%", height: "100%" }}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
    >
      {/* Road surface */}
      <svg
        className="absolute bottom-0 right-0 w-full"
        viewBox="0 0 700 60"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMaxYMax meet"
      >
        <rect
          y="20"
          width="700"
          height="40"
          fill="white"
          opacity="0.04"
          rx="4"
        />
        <line
          x1="0"
          y1="38"
          x2="700"
          y2="38"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="24 16"
          opacity="0.12"
        />
      </svg>

      {/* Bus body */}
      <motion.svg
        className="relative z-10 mb-6 mr-8 xl:mr-16 drop-shadow-2xl"
        width="420"
        height="260"
        viewBox="0 0 420 260"
        fill="none"
        aria-hidden="true"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Shadow under bus */}
        <ellipse
          cx="210"
          cy="252"
          rx="170"
          ry="8"
          fill="black"
          opacity="0.15"
        />

        {/* Main body */}
        <rect
          x="30"
          y="60"
          width="360"
          height="150"
          rx="16"
          fill="white"
          opacity="0.18"
        />
        <rect
          x="30"
          y="60"
          width="360"
          height="150"
          rx="16"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.25"
        />

        {/* Roof line / accent stripe */}
        <rect
          x="30"
          y="60"
          width="360"
          height="24"
          rx="16"
          fill="white"
          opacity="0.1"
        />
        <rect
          x="42"
          y="90"
          width="336"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0.2"
        />

        {/* Windows row */}
        <rect
          x="52"
          y="100"
          width="44"
          height="50"
          rx="8"
          fill="white"
          opacity="0.12"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <rect
          x="106"
          y="100"
          width="44"
          height="50"
          rx="8"
          fill="white"
          opacity="0.12"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <rect
          x="160"
          y="100"
          width="44"
          height="50"
          rx="8"
          fill="white"
          opacity="0.12"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <rect
          x="214"
          y="100"
          width="44"
          height="50"
          rx="8"
          fill="white"
          opacity="0.12"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <rect
          x="268"
          y="100"
          width="44"
          height="50"
          rx="8"
          fill="white"
          opacity="0.12"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.2"
        />

        {/* Door */}
        <rect
          x="325"
          y="100"
          width="52"
          height="80"
          rx="8"
          fill="white"
          opacity="0.08"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <line
          x1="351"
          y1="105"
          x2="351"
          y2="175"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <circle cx="342" cy="140" r="2.5" fill="white" opacity="0.3" />

        {/* Front windshield */}
        <path
          d="M30 76 C30 68 38 60 46 60 L64 60 L64 150 L30 150 Z"
          fill="white"
          opacity="0.1"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.15"
        />

        {/* Headlights */}
        <rect
          x="30"
          y="170"
          width="16"
          height="10"
          rx="3"
          fill="white"
          opacity="0.3"
        />
        <rect
          x="30"
          y="185"
          width="10"
          height="6"
          rx="2"
          fill="#fbbf24"
          opacity="0.35"
        />

        {/* Tail lights */}
        <rect
          x="374"
          y="172"
          width="16"
          height="8"
          rx="3"
          fill="#ef4444"
          opacity="0.3"
        />

        {/* Bumper */}
        <rect
          x="26"
          y="206"
          width="368"
          height="8"
          rx="4"
          fill="white"
          opacity="0.12"
        />

        {/* Side stripe decoration */}
        <rect
          x="50"
          y="160"
          width="268"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0.15"
        />
        <rect
          x="50"
          y="168"
          width="180"
          height="2"
          rx="1"
          fill="white"
          opacity="0.08"
        />

        {/* Wheels */}
        <circle
          cx="100"
          cy="226"
          r="24"
          fill="white"
          opacity="0.12"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.25"
        />
        <circle
          cx="100"
          cy="226"
          r="14"
          fill="white"
          opacity="0.08"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.15"
        />
        <circle cx="100" cy="226" r="5" fill="white" opacity="0.2" />

        <circle
          cx="310"
          cy="226"
          r="24"
          fill="white"
          opacity="0.12"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.25"
        />
        <circle
          cx="310"
          cy="226"
          r="14"
          fill="white"
          opacity="0.08"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.15"
        />
        <circle cx="310" cy="226" r="5" fill="white" opacity="0.2" />

        {/* Mirror */}
        <rect
          x="20"
          y="108"
          width="12"
          height="18"
          rx="4"
          fill="white"
          opacity="0.15"
        />

        {/* Brand text on side */}
        <text
          x="140"
          y="195"
          fill="white"
          opacity="0.2"
          fontSize="14"
          fontWeight="700"
          fontFamily="sans-serif"
          letterSpacing="4"
        >
          TIKETBUS
        </text>
      </motion.svg>
    </motion.div>
  );
}

const ROUTES = [
  {
    from: "Tugumulyo",
    to: "Lampung",
    price: "Rp 300.000",
    duration: "~10 jam",
    cls: "Eksekutif",
  },
  {
    from: "Surabaya",
    to: "Malang",
    price: "Rp 45.000",
    duration: "2 jam",
    cls: "Bisnis",
  },
  {
    from: "Semarang",
    to: "Yogyakarta",
    price: "Rp 55.000",
    duration: "2.5 jam",
    cls: "Eksekutif",
  },
  {
    from: "Jakarta",
    to: "Semarang",
    price: "Rp 150.000",
    duration: "6 jam",
    cls: "VIP",
  },
  {
    from: "Bandung",
    to: "Garut",
    price: "Rp 35.000",
    duration: "1.5 jam",
    cls: "Ekonomi",
  },
];

const INFO_CARDS = [
  {
    icon: Shield,
    label: "Perjalanan Aman",
    desc: "Armada terawat & berasuransi",
    iconBg: "bg-green-400/20",
    iconColor: "text-green-300",
  },
  {
    icon: Star,
    label: "Rating 4.8/5",
    desc: "Dari 10.000+ penumpang",
    iconBg: "bg-yellow-400/20",
    iconColor: "text-yellow-300",
  },
  {
    icon: Clock,
    label: "Tepat Waktu",
    desc: "98% on-time departure",
    iconBg: "bg-blue-300/20",
    iconColor: "text-blue-200",
  },
];

function InfoCardRow() {
  return (
    <motion.div
      className="hidden lg:grid grid-cols-3 gap-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
    >
      {INFO_CARDS.map((card, i) => (
        <motion.div
          key={card.label}
          className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.07] backdrop-blur-md border border-white/[0.1] px-3 py-4 shadow-lg cursor-default text-center"
          whileHover={{
            scale: 1.04,
            backgroundColor: "rgba(255,255,255,0.12)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg}`}
          >
            <card.icon className={`h-4 w-4 ${card.iconColor}`} />
          </div>
          <p className="text-xs font-semibold text-primary-foreground leading-tight">
            {card.label}
          </p>
          <p className="text-[10px] text-primary-foreground/45 leading-tight">
            {card.desc}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function QuickRouteSearch() {
  const selectedFrom = "Tugumulyo"; // Hardcoded origin
  const [selectedTo, setSelectedTo] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<(typeof ROUTES)[0] | null>(null);

  // Get only destination cities available from Tugumulyo
  const destinationCities = ROUTES.filter((r) => r.from === "Tugumulyo")
    .map((r) => r.to)
    .sort();

  function handleSearch() {
    const found = ROUTES.find(
      (r) => r.from === selectedFrom && r.to === selectedTo,
    );
    setResult(found || null);
    setShowResult(true);
  }

  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
    >
      <div className="rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] p-6 shadow-2xl max-w-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10">
            <Bus className="h-4 w-4 text-primary-foreground" />
          </div>
          <h3 className="text-sm font-semibold text-primary-foreground">
            Cari Rute Cepat
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {/* From - Static display */}
          <div className="relative">
            <label className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mb-1 block font-medium">
              Kota Asal
            </label>
            <div className="rounded-lg bg-white/10 border border-white/10 px-3 py-2.5">
              <span className="text-sm text-primary-foreground font-medium">
                Tugumulyo
              </span>
            </div>
          </div>

          {/* To selector */}
          <div className="relative">
            <label className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mb-1 block font-medium">
              Kota Tujuan
            </label>
            <div className="relative">
              <select
                value={selectedTo}
                onChange={(e) => {
                  setSelectedTo(e.target.value);
                  setShowResult(false);
                }}
                className="w-full appearance-none rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-white/25 transition-colors cursor-pointer"
              >
                <option value="" className="text-foreground">
                  Pilih kota...
                </option>
                {destinationCities.map((c) => (
                  <option key={c} value={c} className="text-foreground">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-primary-foreground/40 pointer-events-none" />
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            disabled={!selectedTo}
            className="mt-1 w-full rounded-lg bg-primary-foreground/20 border border-primary-foreground/10 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/30 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Cari Rute
          </button>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {showResult && (
            <motion.div
              key={result ? "found" : "notfound"}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {result ? (
                <div className="mt-4 rounded-lg bg-white/10 border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-primary-foreground/50">
                      Rute ditemukan
                    </span>
                    <span className="text-[10px] rounded-full bg-green-400/20 text-green-300 px-2 py-0.5 font-medium">
                      {result.cls}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground font-semibold">
                    <span>{result.from}</span>
                    <ArrowRight className="h-3 w-3 text-primary-foreground/40" />
                    <span>{result.to}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    {/* PRICE + ASTERISK + TOOLTIP */}
                    <div className="relative inline-block group">
                      <span className="text-lg font-bold text-primary-foreground">
                        {result.price}
                        <sup className="text-xs align-super ml-0.5 cursor-pointer">
                          *
                        </sup>
                      </span>
                      {/* Tooltip */}
                      <div className="pointer-events-none absolute left-1/2  mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap rounded bg-black px-2 text-[10px] text-white z-10">
                        Harga dapat berubah, T&C berlaku
                      </div>
                    </div>
                    <span className="text-xs text-primary-foreground/50 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {result.duration}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-lg bg-white/10 border border-white/10 p-4 text-center">
                  <p className="text-xs text-primary-foreground/50">
                    Rute tidak ditemukan. Hubungi kami untuk info lebih lanjut.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, hsl(213, 75%, 50%) 0%, hsl(215, 85%, 35%) 100%)",
      }}
    >
      {/* Background pattern layer */}
      <BackgroundPattern />

      {/* Parallax decorative layer */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <RouteLines />
        <Particles />
      </motion.div>

      {/* Bus illustration - right side */}
      <HeroBusIllustration />

      {/* Content - two column grid */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-28 pb-20 md:pt-32 md:pb-24"
        style={{ y: textY }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-2 mb-6"
            >
              <MapPin className="h-4 w-4 text-primary-foreground/70" />
              <span className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase">
                Loket tiket bus Tugumulyo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-tight text-balance"
            >
              Perjalanan Nyaman,{" "}
              <span className="text-primary-foreground/80">
                Harga Terjangkau
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-6 text-lg text-primary-foreground/70 leading-relaxed max-w-lg"
            >
              Pesan tiket bus dari Tugumulyo ke berbagai tujuan dengan mudah dan
              cepat. Nikmati perjalanan yang aman, nyaman, dan tepat waktu ke
              seluruh tujuan favorit Anda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#pesan"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Pesan Tiket
                <ArrowRight className="h-4 w-4" />
              </a>
              {/* <a
                href="#harga"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/25 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Lihat Harga
              </a> */}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-14 flex flex-wrap items-center gap-6 text-primary-foreground/50 text-sm"
            >
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                50+ Rute Tersedia
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                10.000+ Penumpang
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Keberangkatan Setiap Hari
              </span>
            </motion.div>
          </div>

          {/* Right column - Info cards + Route Search widget */}
          <div className="flex flex-col gap-5 lg:justify-center">
            <InfoCardRow />
            <QuickRouteSearch />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
