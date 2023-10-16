import "./globals.css";
import { Inter } from "next/font/google";

import Nav from "../components/Nav";

export const metadata = {
  title: "miko's portfolio",
  description: "miko's portfolio, a place to showcase my projects and skills.",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} h-auto max-h-full px-8 lg:py-24 sm:px-16 lg:p-52  lg:px-52 bg-zinc-100`}>
        <main>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
