import { z } from "zod";

// zennの半公式APIから取得できるユーザーの記事データ
// https://zenn.dev/h_ymt/articles/5e44b4967f6764#comment-11db82cbe67ca1

// トピックのスキーマ
export const ZennTopicSchema = z.object({
  name: z.string().min(1),
});

// Zenn記事のスキーマ
export const ZennArticleSchema = z.object({
  id: z.number(),
  slug: z.string().optional(),
  path: z.string().startsWith("/"),
  title: z.string().min(1),
  emoji: z.string().optional(),
  published_at: z.string(),
  body_updated_at: z.string(),
  liked_count: z.number().optional(),
});

// Zennスクラップのスキーマ
export const ZennScrapSchema = z.object({
  path: z.string().startsWith("/"),
  title: z.string().min(1),
  topics: z.array(ZennTopicSchema).nullable().default(null),
  created_at: z.string(),
  last_comment_created_at: z.string(),
});

// APIレスポンススキーマ
export const ZennArticleListSchema = z.object({
  articles: z.array(ZennArticleSchema),
  next_page: z.number().nullable().optional(),
});

export const ZennScrapListSchema = z.object({
  scraps: z.array(ZennScrapSchema),
});

// TypeScriptの型を生成
export type ZennTopic = z.infer<typeof ZennTopicSchema>;
export type ZennArticle = z.infer<typeof ZennArticleSchema>;
export type ZennScrap = z.infer<typeof ZennScrapSchema>;
export type ZennArticleList = z.infer<typeof ZennArticleListSchema>;
export type ZennScrapList = z.infer<typeof ZennScrapListSchema>;
