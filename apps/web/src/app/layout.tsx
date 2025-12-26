import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import TopNavBar from "@/features/navigation-bar/components/TopNavBar";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { NEXT_PUBLIC_BASE_URL } from "../../config";

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
  metadataBase: new URL(NEXT_PUBLIC_BASE_URL),
  title: {
    default: "T2フォックスのホームページ",
    template: "%s - T2フォックスのホームページ",
  },
  description: "T2フォックス(開発者)の活動内容をまとめたホームページです。",
  openGraph: {
    title: "T2フォックスのホームページ",
    description: "T2フォックス(開発者)の活動内容をまとめたホームページです。",
    type: "website",
    url: "/",
    images: [
      {
        url: "/ogp/OGP2.png",
        width: 1200,
        height: 630,
        alt: "T2フォックスのホームページ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "T2フォックスのホームページ",
    description: "T2フォックス(開発者)の活動内容をまとめたホームページです。",
    images: ["/ogp/OGP2.png"],
  },
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
          "min-h-screen flex-col antialiased",
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
