"use client";

import { useState } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const packages = [
  {
    name: "VIP",
    price: "Rp 250.000",
    seats: "45 Kursi",
    perks: "",
    popular: false,
  },
  {
    name: "Legrest",
    price: "Rp 300.000",
    seats: "32 Kursi",
    perks: "",
    popular: true,
  },
  {
    name: "Sleeper",
    price: "Rp 480.000",
    seats: "24 Kursi",
    perks: "Gratis Makan 1x",
    popular: true,
  },
];

function PriceCard({
  data,
  index,
}: {
  data: (typeof packages)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className={`relative rounded-2xl bg-card border border-border p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        index % 2 !== 0 ? "lg:translate-y-4" : ""
      }`}
    >
      {data.popular && (
        <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1">
          <Star className="h-3 w-3 fill-primary-foreground text-primary-foreground" />
          <span className="text-xs font-semibold text-primary-foreground">
            Populer
          </span>
        </div>
      )}

      <h3 className="text-lg font-bold text-foreground mb-2">{data.name}</h3>

      {/* <div className="mb-3">
        <span className="text-2xl font-bold text-primary">{data.price}</span>
        <span className="text-sm text-muted-foreground ml-1">/ orang</span>
      </div> */}

      <div className="mb-3 relative group">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-primary">{data.price}</span>

          {/* small star */}
          <sup className="text-sm align-super ml-0.5 cursor-pointer">*</sup>
        </div>

        <span className="text-sm text-muted-foreground ml-1">/ orang</span>

        {/* tooltip */}
        <div className="pointer-events-none absolute left-0 top-full mt-1 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100">
          Harga dapat berubah sewaktu-waktu.
          <br />
          T&amp;C berlaku.
        </div>
      </div>

      <div className="space-y-1 text-sm text-muted-foreground mb-4">
        <p>{data.seats}</p>
        {data.perks && <p className="text-primary">{data.perks}</p>}
      </div>

      <a
        href="#pesan"
        className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Pesan
        <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </motion.div>
  );
}

export default function PriceListSection() {
  return (
    <section id="harga" className="py-24 px-6 bg-secondary/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-primary uppercase tracking-wider"
          >
            Daftar Harga
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground text-balance"
          >
            Rute Populer & Harga Terjangkau
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Temukan rute perjalanan dengan harga terbaik. Kami menawarkan
            berbagai kelas bus sesuai kebutuhan Anda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((item, i) => (
            <PriceCard key={item.name} data={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
