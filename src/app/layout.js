import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Satélites y Tuberías — Detección de Fugas",
  description:
    "Localización de fugas en tuberías subterráneas para agricultores. Tecnología satelital aplicada al campo.",
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
