/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  images: {
    unoptimized: true, // penting kalau pakai <Image />
  },
};

export default nextConfig;
