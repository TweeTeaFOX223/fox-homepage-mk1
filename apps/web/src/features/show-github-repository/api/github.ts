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
  console.log('[getGitHubRepositoriesInternal] Called with:', { username, perPage });

  // ビルド時はダミーデータを返す（INTERNAL_API_KEYがない = ビルド時）
  if (!process.env.INTERNAL_API_KEY) {
    console.log('[getGitHubRepositoriesInternal] Build time: Returning empty repositories array');
    return [];
  }

  console.log('[getGitHubRepositoriesInternal] Runtime: Fetching from API');
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    console.log('[getGitHubRepositoriesInternal] Making API request to /github/repositories');
    const res = await client.github.repositories[":username"].$get({
      param: { username },
      query: perPage ? { per_page: perPage.toString() } : {},
    });

    console.log('[getGitHubRepositoriesInternal] API response status:', res.status);

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    console.log('[getGitHubRepositoriesInternal] Received repositories count:', data.repositories.length);
    return data.repositories;
  } catch (error) {
    console.error("[getGitHubRepositoriesInternal] Error fetching GitHub repositories:", error);
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
