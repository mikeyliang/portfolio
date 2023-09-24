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
      <body className={inter.variable}>
        <main className="h-auto px-4 py-24 sm:px-16 lg:p-52 lg:px-52 bg-zinc-100 dark:bg-zinc-700">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
