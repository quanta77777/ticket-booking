"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../globals.css";
import { ThemeProvider } from "../theme-provider";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
const inter = Inter({ subsets: ["latin"] });


const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}   bg-white dark:bg-slate-900 bg-no-repeat`}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
           

            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
