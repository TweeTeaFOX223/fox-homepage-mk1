import { getUnifiedArticles } from "../api/articles";
import type { UnifiedArticle } from "@my-portfolio/shared/types/article";
import CommonArticleCard from "./CommonArticleCard";
import { ZENN_USERNAME } from "../../../../config";
import ViewAllCard from "@/components/ViewAllCard";

// unstable_cacheの設定を継承（このコンポーネント自体は設定不要）

export default async function ArticleList({ limit }: { limit?: number } = {}) {
  // 新しい統合APIを使用
  const allArticles = await getUnifiedArticles(ZENN_USERNAME, 30);

  // limit が指定されている場合は制限する
  const displayArticles = limit ? allArticles.slice(0, limit) : allArticles;
  const showViewAllCard = limit && allArticles.length > limit;

  // 記事タイプごとの統計を計算
  const qiitaCount = allArticles.filter(a => a.article_type === "Qiita記事").length;
  const zennArticleCount = allArticles.filter(a => a.article_type === "Zenn記事").length;
  const zennScrapCount = allArticles.filter(a => a.article_type === "Zennスクラップ").length;

  const articleStats = [
    { label: "Qiita記事", count: qiitaCount },
    { label: "Zenn記事", count: zennArticleCount },
    { label: "Zennスクラップ", count: zennScrapCount },
  ].filter(stat => stat.count > 0); // 0個のものは表示しない

  return (
    <div className="w-full space-y-4 p-4">
      <div className="relative p-6 pb-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
          <span className="block sm:inline">開発技術の</span>
          <span className="block sm:inline">記事</span>
        </h2>
        <p className="text-muted-foreground flex items-center justify-center mt-4">
          ZennとQiitaに投稿している、開発技術に関係する記事です。
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayArticles.map((article: UnifiedArticle) => (
          <CommonArticleCard key={article.url} article={article} />
        ))}
        {showViewAllCard && (
          <ViewAllCard
            href="/articles"
            title="全ての記事を見る"
            totalCount={allArticles.length}
            stats={articleStats}
          />
        )}
      </div>
    </div>
  );
}
