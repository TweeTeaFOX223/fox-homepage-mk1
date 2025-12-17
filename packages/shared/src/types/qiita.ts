import { z } from "zod";

// QiitaのAPIから取得できるユーザーの記事データのタイプ
// https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF

// タグのスキーマ
export const QiitaTagSchema = z.object({
  name: z.string().min(1),
});

// Qiita記事のスキーマ
export const QiitaArticleSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  title: z.string().min(1),
  tags: z.array(QiitaTagSchema),
  created_at: z.string(),
  updated_at: z.string(),
  likes_count: z.number().optional(),
  user: z
    .object({
      id: z.string(),
      profile_image_url: z.string().url().optional(),
    })
    .optional(),
});

export const QiitaArticleListSchema = z.array(QiitaArticleSchema);

// TypeScriptの型を生成
export type QiitaTag = z.infer<typeof QiitaTagSchema>;
export type QiitaArticle = z.infer<typeof QiitaArticleSchema>;
export type QiitaArticleList = z.infer<typeof QiitaArticleListSchema>;
