// zennの半公式APIから取得できるユーザーの記事データ
// https://zenn.dev/h_ymt/articles/5e44b4967f6764#comment-11db82cbe67ca1

// 自分の場合
// https://zenn.dev/api/articles?username=tweeteafox300&order=latest
// https://zenn.dev/api/scraps?username=tweeteafox300&order=latest

import { ZENN_USERNAME } from "../../../../config";
import {
  CommonArticleItem,
  ZennArticleItem,
  ZennScrapsItem,
} from "../types/article-item-type";

export async function getZennArticles() {
  const username = ZENN_USERNAME;

  if (!username) {
    throw new Error("ZennのユーザーIDが環境変数にないです");
  }

  const articleResponse = await fetch(
    `https://zenn.dev/api/articles?username=${username}&order=latest`,
    {
      next: {
        revalidate: 3600, // 1時間ごとに再検証
      },
    }
  );

  if (!articleResponse.ok) {
    throw new Error("Zennからの記事フェッチに失敗");
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
    throw new Error("Zennからのスクラップフェッチに失敗");
  }

  const articlesJson = await articleResponse.json();
  const scrapsJson = await scrapsResponse.json();

  // Qiitaのタイプに統一
  const articles_array: CommonArticleItem[] = articlesJson.articles.map(
    (article: ZennArticleItem) => ({
      url: "https://zenn.dev" + article.path,
      title: article.title,
      article_type: "Zenn記事",
      tags: null,
      created_at: article.published_at,
      updated_at: article.body_updated_at,
    })
  );

  // Qiitaのタイプに統一
  // レスポンスのjsonの中にあるarticlesにマップ関数を使う
  const scrapsArray: CommonArticleItem[] = scrapsJson.scraps.map(
    (scraps: ZennScrapsItem) => ({
      url: "https://zenn.dev" + scraps.path,
      title: scraps.title,
      article_type: "Zennスクラップ",
      tags: scraps.topics?.map((tag) => ({
        name: tag.name,
      })),
      created_at: scraps.created_at,
      updated_at: scraps.last_comment_created_at,
    })
  );

  // console.log(articles_array);
  // console.log(scrapsArray);

  // 記事とスクラップの一覧を結合した配列を返す
  return [...articles_array, ...scrapsArray];
}
