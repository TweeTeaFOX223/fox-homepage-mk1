import { z } from "zod";

// GitHubのAPIから取れる、特定ユーザーのリポジトリリストの、個別のリポジトリのスキーマ
//https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
export const RepoCardItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.number().min(0),
  language: z.string().nullable(),
  updated_at: z.string().datetime(),
  created_at: z.string().datetime(),
  fork: z.boolean(),
  topics: z.array(z.string()).nullable().optional(),
});

// リポジトリ配列のスキーマ
export const GitHubReposSchema = z.array(RepoCardItemSchema);

// TypeScriptの型を生成
export type RepoCardItem = z.infer<typeof RepoCardItemSchema>;
export type GitHubRepos = z.infer<typeof GitHubReposSchema>;
