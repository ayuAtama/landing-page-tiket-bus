"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Clock, CreditCard, MapPin, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description:
      "Armada bus kami melewati inspeksi rutin dan memenuhi standar keselamatan tertinggi untuk kenyamanan Anda.",
    size: "large" as const,
  },
  {
    icon: Clock,
    title: "Tepat Waktu",
    description:
      "Jadwal keberangkatan dan kedatangan yang konsisten dan dapat diandalkan.",
    size: "small" as const,
  },
  {
    icon: CreditCard,
    title: "Pembayaran Mudah",
    description:
      "Dukung berbagai metode pembayaran termasuk transfer bank dan e-wallet.",
    size: "small" as const,
  },
  {
    icon: MapPin,
    title: "Rute Lengkap",
    description:
      "Menjangkau berbagai kota dan kabupaten di seluruh Jawa, Sumatera, dan sekitarnya.",
    size: "small" as const,
  },
  {
    icon: Headphones,
    title: "Layanan Pelanggan 24/7",
    description:
      "Tim kami siap membantu Anda kapanpun, sebelum, selama, dan setelah perjalanan.",
    size: "small" as const,
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className={`group relative rounded-2xl bg-card border border-border p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg h-full ${
        feature.size === "large" ? "md:row-span-2" : ""
      }`}
    >
      <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
      {feature.size === "large" && (
        <div className="mt-8 hidden md:block">
          <div className="rounded-xl bg-secondary p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-secondary-foreground">
                Status Armada
              </span>
            </div>
            <div className="space-y-2">
              {["Bus VIP", "Bus Leg Rest", "Bus Sleeper"].map((bus) => (
                <div
                  key={bus}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{bus}</span>
                  <span className="font-medium text-primary">Tersedia</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function CustomGridFeatures() {
  return (
    <section id="layanan" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-primary uppercase tracking-wider"
          >
            Mengapa Kami
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground text-balance"
          >
            Layanan Terbaik untuk Perjalanan Anda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Kami berkomitmen memberikan pengalaman perjalanan bus yang nyaman,
            aman, dan terpercaya.
          </motion.p>
        </div>

        {/* Horizontal scroll on mobile, grid on larger screens */}
        <div className="overflow-x-auto md:overflow-x-visible -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex md:grid gap-5 md:grid-cols-2 lg:grid-cols-3 pb-4 md:pb-0">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="flex-shrink-0 w-[280px] md:w-auto"
              >
                <FeatureCard feature={feature} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
