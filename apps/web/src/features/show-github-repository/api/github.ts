// Backend層を経由したGitHubリポジトリ取得API
import { createApiClient, getApiEnv } from "@/lib/api-client";
import type { GitHubRepository } from "@my-portfolio/shared/types/github";
import { unstable_cache } from "next/cache";

/**
 * GitHubリポジトリ一覧を取得（内部関数）
 */
const getGitHubRepositoriesInternal = async (
  username: string,
  perPage?: number
): Promise<GitHubRepository[]> => {
  // ビルド時はダミーデータを返す
  if (process.env.NODE_ENV !== 'production' && !process.env.API) {
    console.log('Build time: Returning empty repositories array');
    return [];
  }

  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.github.repositories[":username"].$get({
      param: { username },
      query: perPage ? { per_page: perPage.toString() } : {},
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    return data.repositories;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    // エラー時も空配列を返してビルドを継続
    return [];
  }
};

/**
 * GitHubリポジトリ一覧を取得
 * ISRで1時間キャッシュ
 */
export const getGitHubRepositories = unstable_cache(
  getGitHubRepositoriesInternal,
  ["github-repositories"],
  {
    revalidate: 3600, // 1時間
    tags: ["repositories"],
  }
);
