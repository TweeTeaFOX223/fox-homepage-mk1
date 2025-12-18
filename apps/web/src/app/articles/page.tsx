import ArticleList from "@/features/show-article-list/components/ArticleList";
import { NEXT_PUBLIC_BASE_URL } from "../../../config";

export const metadata = {
  metadataBase: new URL(NEXT_PUBLIC_BASE_URL),
  title: "記事一覧 - T2フォックスのホームページ",
  description: "ZennとQiitaに投稿している開発技術に関する記事の一覧です。",
  openGraph: {
    title: "記事一覧 - T2フォックスのホームページ",
    description: "ZennとQiitaに投稿している開発技術に関する記事の一覧です。",
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

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ArticleList />
      </div>
    </main>
  );
}
