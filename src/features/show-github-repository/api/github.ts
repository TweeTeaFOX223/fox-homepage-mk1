// Githubの個別ユーザーのリポジトリ一覧のAPI
// https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
// https://qiita.com/hukuryo/items/5c3e428f6620f991ade9#%E5%AE%9F%E8%A3%85

import { z } from "zod";

import { GITHUB_TOKEN, GITHUB_USERNAME } from "../../../../config";
import { GitHubReposSchema, RepoCardItem } from "../schemas/github-repo-schema";

export async function getGithubRepos(): Promise<RepoCardItem[]> {
  const username = GITHUB_USERNAME;
  const token = GITHUB_TOKEN;

  if (!username || !token) {
    throw new Error("GitHub credentials are not configured");
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: {
          revalidate: 3600, // 1時間ごとに再検証
        },
      }
    );
    // console.log(response); //レスポンスが変だったらここで確認

    if (!response.ok) {
      throw new Error(`GitHubのAPIのフェッチに失敗： ${response.status}`);
    }

    const rawData = await response.json();

    // Zodを使用してデータをバリデーション
    const validatedRepos = GitHubReposSchema.parse(rawData);

    return validatedRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      topics: repo.topics,
    }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("GitHub API レスポンスの形式が不正:", error.issues);
      throw new Error(
        "Qiita APIのレスポンス形式が変更されている可能性があります"
      );
    }
    throw error;
  }
}
