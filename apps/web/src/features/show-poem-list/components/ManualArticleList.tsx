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
      <h2 className="text-2xl font-black mb-6 flex items-center justify-center bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
        雑多な記事
      </h2>
      <p className="text-muted-foreground flex items-center justify-center">
        noteに投稿している、開発技術に直接関係が無いポエム的な記事です。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {articles.map((article) => (
          <ManualArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
}
