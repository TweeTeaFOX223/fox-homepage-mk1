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
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.github.repositories[":username"].$get({
      param: { username },
      query: perPage ? { per_page: perPage.toString() } : undefined,
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    return data.repositories;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw error;
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
