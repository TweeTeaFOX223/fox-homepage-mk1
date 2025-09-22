// zennの半公式APIから取得できるユーザーの記事データ
// https://zenn.dev/h_ymt/articles/5e44b4967f6764#comment-11db82cbe67ca1

// 自分の場合
// https://zenn.dev/api/articles?username=tweeteafox300&order=latest
// https://zenn.dev/api/scraps?username=tweeteafox300&order=latest

import { z } from "zod";

import { ZENN_USERNAME } from "../../../../config";

import {
  CommonArticleItem,
  zennArticlesApiResponseSchema,
  zennScrapsApiResponseSchema,
} from "../schemas/article-schemas";

export async function getZennArticles() {
  const username = ZENN_USERNAME;

  if (!username) {
    throw new Error("ZennのユーザーIDが環境変数にないです");
  }

  try {
    const articleResponse = await fetch(
      `https://zenn.dev/api/articles?username=${username}&order=latest`,
      {
        next: {
          revalidate: 3600, // 1時間ごとに再検証
        },
      }
    );

    if (!articleResponse.ok) {
      throw new Error(
        `Zennからの記事フェッチに失敗: ${articleResponse.status}`
      );
    }

    const scrapsResponse = await fetch(
      `https://zenn.dev/api/scraps?username=${username}&order=latest`,
      {
        next: {
          revalidate: 7200, // 2時間ごとに再検証
        },
      }
    );

    if (!scrapsResponse.ok) {
      throw new Error(
        `Zennからのスクラップフェッチに失敗: ${scrapsResponse.status}`
      );
    }

    const articlesJson = await articleResponse.json();
    const scrapsJson = await scrapsResponse.json();

    // Zodでバリデーション
    const validatedArticles = zennArticlesApiResponseSchema.parse(articlesJson);
    const validatedScraps = zennScrapsApiResponseSchema.parse(scrapsJson);

    // Qiitaのタイプに統一
    const articlesArray: CommonArticleItem[] = validatedArticles.articles.map(
      (article) => ({
        url: `https://zenn.dev${article.path}`,
        title: article.title,
        article_type: "Zenn記事" as const,
        tags: null,
        created_at: article.published_at,
        updated_at: article.body_updated_at,
      })
    );

    // Qiitaのタイプに統一
    // レスポンスのjsonの中にあるarticlesにマップ関数を使う
    const scrapsArray: CommonArticleItem[] = validatedScraps.scraps.map(
      (scrap) => ({
        url: `https://zenn.dev${scrap.path}`,
        title: scrap.title,
        article_type: "Zennスクラップ" as const,
        tags: scrap.topics,
        created_at: scrap.created_at,
        updated_at: scrap.last_comment_created_at,
      })
    );

    // console.log(articles_array);
    // console.log(scrapsArray);

    // 記事とスクラップの一覧を結合した配列を返す
    return [...articlesArray, ...scrapsArray];
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zenn API レスポンスの形式が不正:", error.issues);
      throw new Error(
        "Zenn APIのレスポンス形式が変更されている可能性があります"
      );
    }
    throw error;
  }
}
