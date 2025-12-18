import BaseProfile from "@/features/base-profile/components/BaseProfile";
import TechInterests from "@/features/interested-technology/components/TechInterests";
import ArticleList from "@/features/show-article-list/components/ArticleList";
import RepositoryList from "@/features/show-github-repository/components/RepositoryList";
import ManualArticleList from "@/features/show-poem-list/components/ManualArticleList";
import { NEXT_PUBLIC_BASE_URL } from "../../config";

export const metadata = {
  metadataBase: new URL(NEXT_PUBLIC_BASE_URL),
  openGraph: {
    title: "T2フォックスのホームページ",
    description: "これはT2フォックスの制作物をまとめたホームページです。",
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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <section id="profile" className="mt-8 scroll-my-16">
          <BaseProfile />
        </section>

        <section id="interest-tech" className="mt-8 scroll-my-16">
          <TechInterests />
        </section>

        <section id="poem-articles" className="mt-8 scroll-my-16">
          {/* ここに最新の記事 */}
          <ManualArticleList />
        </section>

        <section id="tech-articles" className="mt-8 scroll-my-16">
          {/* ここに最新の記事 */}
          <ArticleList limit={5} />
        </section>

        <section id="products" className="mt-8 scroll-my-16">
          {/* ここに最新にリポジトリ */}
          <RepositoryList limit={5} />
        </section>
      </div>
    </main>
  );
}
