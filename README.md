# Landing Page Tiket Bus — Next.js Landing & UI

Profesional landing page dan komponen UI untuk landing page loket tiket bus, dibangun dengan Next.js (App Router) dan Tailwind CSS. Proyek ini berfokus pada halaman depan responsif, komponen UI terstruktur, dan integrasi komponen siap-pakai untuk mempercepat pengembangan front-end.

## Fitur Utama

- Desain landing page modern dan responsif
- Sekumpulan komponen UI terorganisir di `components/ui`
- Dukungan server-side rendering dan static rendering via Next.js
- Tailwind CSS + konfigurasi siap pakai

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Persyaratan

- Node.js 18+ dan `pnpm` atau `npm`
- Environment variables: file `.env` (lihat bagian di bawah)

## Instalasi & Menjalankan Secara Lokal

1. Masuk ke direktori proyek:

   ```bash
   cd Landing-Page-Tiket-Bus
   ```

2. Install dependensi:

   ```bash
   pnpm install
   # atau
   npm install
   ```

3. Menjalankan development server:

   ```bash
   pnpm dev
   # atau
   npm run dev
   ```

4. Buka http://localhost:3000 untuk melihat aplikasi.

## Build & Produksi

```bash
pnpm build
pnpm start
# atau
npm run build
npm run start
```

## Variabel Lingkungan

Letakkan konfigurasi sensitif di file `.env` pada root proyek. Contoh variabel yang mungkin digunakan:

- `NEXT_PUBLIC_API_URL` — URL API untuk panggilan client-side
- `DATABASE_URL` — bila diperlukan oleh backend

Pastikan file `.env` tidak di-commit (lihat `.gitignore`).

## Struktur Proyek (ringkasan)

- `app/` — App Router, halaman dan layout Next.js
- `components/` — Komponen UI khusus halaman dan `ui/` berisi komponen desain sistem
- `public/` — Aset statis (gambar, ikon)
- `styles/` — Berkas CSS global

Contoh file penting:

- [app/page.tsx](app/page.tsx) — titik masuk halaman utama
- [components/PriceListSection.tsx](components/PriceListSection.tsx) — contoh komponen halaman

## Deployment

Proyek ini dapat dideploy ke platform modern seperti Vercel atau Netlify.

Contoh langkah singkat (Vercel):

1. Push repository ke Git provider (GitHub/GitLab/Bitbucket)
2. Connect repository ke Vercel
3. Atur build command `pnpm build` dan root `.`

## Kontribusi

Terima kasih atas niat kontribusi! Silakan ikuti alur berikut:

1. Fork repository
2. Buat branch fitur: `git checkout -b feat/your-feature`
3. Commit perubahan dan push
4. Buka Pull Request dengan deskripsi jelas dan screenshot bila perlu

## Testing & Quality

- Gunakan `pnpm lint` / `npm run lint` bila tersedia untuk cek kode
- Pastikan komponen baru dilengkapi unit/integration tests bila diperlukan

## Lisensi

Lisensi proyek ini belum ditentukan. Jika Anda pemilik, tambahkan file `LICENSE` di root proyek.

## Kontak

Untuk pertanyaan atau bantuan, buka issue di repository atau hubungi maintainer.

---
