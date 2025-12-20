import AppListWithControls from "@/features/show-apps/components/AppListWithControls";
import { apps } from "@/features/show-apps/config/apps";
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
          <div className="relative p-6 pb-4">
            <h1 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
              [公開中のアプリ]
            </h1>
            <p className="text-muted-foreground flex items-center justify-center mt-4">
              公開中のアプリ一覧です。
            </p>
          </div>
          <AppListWithControls apps={apps} />
        </div>
      </div>
    </main>
  );
}
