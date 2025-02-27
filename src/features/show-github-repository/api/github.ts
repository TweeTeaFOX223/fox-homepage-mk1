// Githubの個別ユーザーのリポジトリ一覧のAPI
// https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
// https://qiita.com/hukuryo/items/5c3e428f6620f991ade9#%E5%AE%9F%E8%A3%85

import { GITHUB_TOKEN, GITHUB_USERNAME } from "../../../../config";
import { RepoCardItem } from "../types/github-repo-type";

export async function getGithubRepos() {
  const username = GITHUB_USERNAME;
  const token = GITHUB_TOKEN;

  if (!username || !token) {
    throw new Error("GitHub credentials are not configured");
  }

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
    throw new Error("Failed to fetch repositories");
  }

  const repos = await response.json();
  return repos.map((repo: RepoCardItem) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    updated_at: repo.updated_at,
    created_at: repo.created_at,
  }));
}
