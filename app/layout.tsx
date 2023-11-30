"use client";

import "./globals.css";
import { Inter } from "next/font/google";

import Nav from "../components/Nav";
import LoadingAnimation from "../components/LoadingAnimation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Worker } from "@react-pdf-viewer/core";

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
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="./icon.png" type="image/png" />
      </head>
      <body className={`${inter.variable}  bg-zinc-100`}>
        <main>
          {pathname === "/" && isLoading ? (
            <>
              <LoadingAnimation></LoadingAnimation>
            </>
          ) : (
            <div className="h-auto max-h-full px-8 lg:py-24 sm:px-16 lg:p-52 lg:px-52 ">
              <Nav />

              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                {children}
              </Worker>
            </div>
          )}
        </main>
      </body>
    </html>
  );
}
