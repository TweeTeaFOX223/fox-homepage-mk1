// GitHubのAPIから取れる、特定ユーザーのリポジトリリストの、個別のリポジトリのタイプ
//https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
export type RepoCardItem = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[] | null;
};
