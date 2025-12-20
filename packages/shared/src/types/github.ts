import { z } from "zod";

// GitHubのAPIから取れる、特定ユーザーのリポジトリリストの、個別のリポジトリのスキーマ
// https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
export const GitHubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string().optional(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  fork: z.boolean(),
  stargazers_count: z.number().min(0),
  language: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  topics: z.array(z.string()).nullable().optional(),
});

// リポジトリ配列のスキーマ
export const GitHubRepositoryListSchema = z.array(GitHubRepositorySchema);

// TypeScriptの型を生成
export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>;
export type GitHubRepositoryList = z.infer<typeof GitHubRepositoryListSchema>;
