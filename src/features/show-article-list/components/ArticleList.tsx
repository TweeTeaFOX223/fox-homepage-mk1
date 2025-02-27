import { getQiitaArticles } from "../api/get-qiita-articles";
import { getZennArticles } from "../api/get-zenn-articles";
import { CommonArticleItem } from "../types/article-item-type";
import CommonArticleCard from "./CommonArticleCard";

export default async function ArticleList() {
  const qiitaArticles = await getQiitaArticles();
  const ZennArticles = await getZennArticles();

  //スプレッド演算子を使って一つのオブジェクトにまとめる
  const allArticles = [...qiitaArticles, ...ZennArticles];

  return (
    <div className="w-full space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
        開発技術の記事
      </h2>
      <p className="text-muted-foreground flex items-center justify-center">
        ZennとQiitaに投稿している、開発技術に関係する記事です。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {allArticles.map((article: CommonArticleItem) => (
          <CommonArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
}
