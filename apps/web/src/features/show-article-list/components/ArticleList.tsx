import { getUnifiedArticles } from "../api/articles";
import type { UnifiedArticle } from "@my-portfolio/shared/types/article";
import CommonArticleCard from "./CommonArticleCard";
import { ZENN_USERNAME } from "../../../../config";

// unstable_cacheの設定を継承（このコンポーネント自体は設定不要）

export default async function ArticleList() {
  // 新しい統合APIを使用
  const allArticles = await getUnifiedArticles(ZENN_USERNAME, 30);

  return (
    <div className="w-full space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
        開発技術の記事
      </h2>
      <p className="text-muted-foreground flex items-center justify-center">
        ZennとQiitaに投稿している、開発技術に関係する記事です。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {allArticles.map((article: UnifiedArticle) => (
          <CommonArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
}
