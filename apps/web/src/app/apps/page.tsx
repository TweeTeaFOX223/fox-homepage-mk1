import AppList from "@/features/show-apps/components/AppList";
import { NEXT_PUBLIC_BASE_URL } from "../../../config";

export const metadata = {
  metadataBase: new URL(NEXT_PUBLIC_BASE_URL),
  title: "公開中のアプリ - T2フォックスのホームページ",
  description: "公開中のアプリ一覧です。",
  openGraph: {
    title: "公開中のアプリ - T2フォックスのホームページ",
    description: "公開中のアプリ一覧です。",
    images: [
      {
        url: "/ogp/OGP2.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// ISR: 3600秒(1時間)ごとに再生成
export const revalidate = 3600;

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-4 p-4">
          <AppList />
        </div>
      </div>
    </main>
  );
}
