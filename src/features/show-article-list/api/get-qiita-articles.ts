// QiitaのAPIから取得できるユーザーの記事データ
// https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF

import { z } from "zod";

import { QIITA_TOKEN } from "../../../../config";
import {
  qiitaApiResponseSchema,
  type CommonArticleItem,
} from "../schemas/article-schemas";

export async function getQiitaArticles() {
  const token = QIITA_TOKEN;

  if (!token) {
    throw new Error("Qiitaのトークンが環境変数にないです");
  }

  try {
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
      throw new Error(`Qiitaからのフェッチに失敗: ${response.status}`);
    }

    const articlesJson = await response.json();

    // Zodでバリデーション
    const validatedArticles = qiitaApiResponseSchema.parse(articlesJson);

    return validatedArticles.map(
      (article): CommonArticleItem => ({
        url: article.url,
        title: article.title,
        article_type: "Qiita記事" as const,
        tags: article.tags,
        created_at: article.created_at,
        updated_at: article.updated_at,
      })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Qiita API レスポンスの形式が不正:", error.issues);
      throw new Error(
        "Qiita APIのレスポンス形式が変更されている可能性があります"
      );
    }
    throw error;
  }
}
