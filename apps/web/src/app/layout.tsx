import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import TopNavBar from "@/features/navigation-bar/components/TopNavBar";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "T2フォックス・ホームページ",
  description: "T2フォックス(開発者)の活動内容をまとめたホームページです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* shadcnのcn関数を使って、フォントのクラスと自分で書いたクラスを混ぜる */}
      <body
        className={cn(
          "container min-h-screen flex-col antialiased",
          notoSansJP.className
        )}
      >
        <TopNavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
