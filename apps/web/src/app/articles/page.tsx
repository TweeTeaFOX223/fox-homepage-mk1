import { getUnifiedArticles } from "@/features/show-article-list/api/articles";
import ArticleListWithControls from "@/features/show-article-list/components/ArticleListWithControls";
import { NEXT_PUBLIC_BASE_URL, ZENN_USERNAME } from "../../../config";

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

export default async function ArticlesPage() {
  const articles = await getUnifiedArticles(ZENN_USERNAME, 30);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-4 p-4">
          <div className="relative p-6 pb-4">
            <h1 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
              <span className="block sm:inline">開発技術の</span>
              <span className="block sm:inline">記事</span>
            </h1>
            <p className="text-muted-foreground flex items-center justify-center mt-4">
              ZennとQiitaに投稿している、開発技術に関係する記事です。
            </p>
          </div>
          <ArticleListWithControls articles={articles} />
        </div>
      </div>
    </main>
  );
}
