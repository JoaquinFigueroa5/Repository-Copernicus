import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#1b4332",
  colorScheme: "light",
};

export const metadata = {
  title: "Satélites y Tuberías — Detección de Fugas en Guatemala",
  description:
    "Localización de fugas en tuberías subterráneas para agricultores. Tecnología satelital aplicada al campo en zonas rurales de Guatemala.",
  openGraph: {
    title: "Satélites y Tuberías — Detección de Fugas",
    description:
      "Localización de fugas en tuberías subterráneas para agricultores. Tecnología satelital aplicada al campo.",
    type: "website",
    locale: "es_GT",
    siteName: "Satélites y Tuberías",
  },
  twitter: {
    card: "summary",
    title: "Satélites y Tuberías — Detección de Fugas",
    description:
      "Localización de fugas en tuberías subterráneas para agricultores. Tecnología satelital aplicada al campo.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
