// Backend層を経由した記事取得API
import { createApiClient, getApiEnv } from "@/lib/api-client";
import type { UnifiedArticle } from "@my-portfolio/shared/types/article";
import { unstable_cache } from "next/cache";

/**
 * Qiita + Zenn + Scrapsの統合記事一覧を取得（キャッシュ付き）
 */
const getUnifiedArticlesInternal = async (
  zennUsername: string,
  limit?: number
): Promise<UnifiedArticle[]> => {
  // ビルド時はダミーデータを返す（INTERNAL_API_KEYがない = ビルド時）
  if (!process.env.INTERNAL_API_KEY) {
    console.log('Build time: Returning empty articles array');
    return [];
  }

  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.articles.unified.$get({
      query: {
        zenn_username: zennUsername,
        limit: limit?.toString(),
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching unified articles:", error);
    // エラー時も空配列を返してビルドを継続
    return [];
  }
};

/**
 * Qiita + Zenn + Scrapsの統合記事一覧を取得
 * ISRで1時間キャッシュ
 */
export const getUnifiedArticles = unstable_cache(
  getUnifiedArticlesInternal,
  ["unified-articles"],
  {
    revalidate: 3600, // 1時間
    tags: ["articles"],
  }
);

/**
 * Qiita記事のみを取得(個別に取得する必要がある場合)
 */
export async function getQiitaArticles(perPage?: number) {
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.qiita.articles.$get({
      query: perPage ? { per_page: perPage.toString() } : {},
    });

    if (!res.ok) {
      throw new Error(`Qiita API error: ${res.status}`);
    }

    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching Qiita articles:", error);
    throw error;
  }
}

/**
 * Zenn記事を取得
 */
export async function getZennArticles(username: string) {
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.zenn.articles[":username"].$get({
      param: { username },
    });

    if (!res.ok) {
      throw new Error(`Zenn API error: ${res.status}`);
    }

    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching Zenn articles:", error);
    throw error;
  }
}

/**
 * Zennスクラップを取得
 */
export async function getZennScraps(username: string) {
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.zenn.scraps[":username"].$get({
      param: { username },
    });

    if (!res.ok) {
      throw new Error(`Zenn Scraps API error: ${res.status}`);
    }

    const data = await res.json();
    return data.scraps;
  } catch (error) {
    console.error("Error fetching Zenn scraps:", error);
    throw error;
  }
}
