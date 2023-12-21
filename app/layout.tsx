import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { Inter } from "next/font/google";

import Nav from "../components/Nav";
import { NextAuthProvider } from "./provider";
import {PDFWorker} from "./worker";

import { MantineProvider } from "@mantine/core";

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
        <link rel="icon" href="./icon.png" type="image/png" />
      </head>
      <body className={`${inter.variable}  bg-zinc-100`}>
        <main>
          <MantineProvider>
            <NextAuthProvider>
              <div className="h-auto max-h-full px-8 pb-16 lg:py-24 sm:px-16 lg:p-52 ">
                <Nav />
                <PDFWorker>{children}</PDFWorker>
              </div>
            </NextAuthProvider>
          </MantineProvider>
        </main>
      </body>
    </html>
  );
}
