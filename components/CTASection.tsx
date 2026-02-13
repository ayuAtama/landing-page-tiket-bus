"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section id="pesan" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-accent p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-accent-foreground text-balance">
            Siap untuk Perjalanan Berikutnya?
          </h2>
          <p className="mt-4 text-accent-foreground/70 max-w-md mx-auto leading-relaxed">
            Hubungi kami sekarang untuk memesan tiket bus Anda. Dapatkan harga
            terbaik dan layanan terpercaya.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/6281373401037?text=Halo%20Kak%2C%20Saya%20ingin%20pesan%20bus.%0ARute%3A%20KOTA_ASAL%20-%20KOTA_TUJUAN%0ATanggal%3A%20TANGGAL%0AJumlah%20penumpang%3A%20JUMLAH%0ATerima%20kasih."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-7 py-3.5 text-sm font-semibold text-accent shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              Hubungi via WhatsApp
            </a>
            <a
              href="tel:+6281373401037"
              className="inline-flex items-center gap-2 rounded-lg border border-accent-foreground/25 px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-foreground/10"
            >
              Telepon Langsung
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
