"use client";

import { GoogleMapsEmbed } from "@next/third-parties/google";
import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section className="py-24 px-6 bg-secondary/50">
      <div className="mx-auto max-w-7xl">
        {/* Header (same style as PriceListSection) */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-primary uppercase tracking-wider"
          >
            Lokasi Agen
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
          >
            Temukan Kami di Google Maps!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-lg mx-auto"
          >
            Kunjungi loket bus agen Tugumulyo kami untuk pemesanan tiket dan
            pengiriman paket.
          </motion.p>
        </div>

        {/* Map Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden"
        >
          <GoogleMapsEmbed
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
            height={420}
            width="100%"
            mode="place"
            q="Agen Bus & Paket Pahala Kencana Tugumulyo"
          />
        </motion.div>
      </div>
    </section>
  );
}
