import { Bus } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Bus className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">
                Loket Tiket Bus Tugumulyo
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Layanan pemesanan tiket bus antar pulau yang terpercaya. Melayani
              perjalanan nyaman ke seluruh tujuan favorit Anda sejak 2015.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Layanan
            </h4>
            <ul className="space-y-2">
              {/* {["Kelas Bus", "Pesan Sekarang"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))} */}
              <li>
                <a
                  href="#harga"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Kelas Bus
                </a>
              </li>
              <li>
                <a
                  href="#pesan"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Pesan Sekarang
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Kontak
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+62 813-7340-1037</li>
              <li>Jl. Lintas Sumatera</li>
              <li>Tugumulyo, Ogan Komering Ilir</li>
              <li> Sumatera Selatan, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Loket Bus Tugumulyo. Semua hak
            dilindungi.
          </p>
          {/* <div className="flex items-center gap-6">
            {["Syarat & Ketentuan", "Kebijakan Privasi"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
