import { manualArticles } from "../config/manual-articles";
import ManualArticleCard from "./ManualArticleCard";

type ManualArticleListProps = {
  limit?: number; // 表示する記事数の制限（オプション）
  filter?: string; // 記事タイプによるフィルタリング（オプション）
};

export default function ManualArticleList({}: // limit,
// filter,
ManualArticleListProps) {
  const articles = manualArticles;

  // フィルタリング
  // if (filter) {
  //   articles = articles.filter((article) => article.article_type === filter);
  // }

  // 表示数制限
  // if (limit && limit > 0) {
  //   articles = articles.slice(0, limit);
  // }

  return (
    <div className="w-full space-y-4 p-4">
      <div className="relative p-6 pb-4">
        <h1 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
          雑多な記事
        </h1>
        <p className="text-muted-foreground flex items-center justify-center mt-4">
          汎用的な手法や思考に関する雑多な記事です。
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {articles.map((article) => (
          <ManualArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
}
