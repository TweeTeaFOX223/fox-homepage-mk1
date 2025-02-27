// QiitaのAPIから取得できるユーザーの記事データ
// https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF

import { QIITA_TOKEN } from "../../../../config";
import { QiitaArticleItem } from "../types/article-item-type";

export async function getQiitaArticles() {
  const token = QIITA_TOKEN;

  if (!token) {
    throw new Error("Qiitaのトークンが環境変数にないです");
  }

  const response = await fetch(
    "https://qiita.com/api/v2/authenticated_user/items",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 3600, // 1時間ごとに再検証
      },
    }
  );

  if (!response.ok) {
    throw new Error("Qiitaからのフェッチに失敗");
  }

  const articles: QiitaArticleItem[] = await response.json();

  return articles.map((article: QiitaArticleItem) => ({
    url: article.url,
    title: article.title,
    article_type: "Qiita記事", // 統一した文字列を使用
    tags: article.tags,
    created_at: article.created_at,
    updated_at: article.updated_at,
  }));
}
