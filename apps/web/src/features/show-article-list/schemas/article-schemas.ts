// QiitaのAPIから取得できるユーザーの記事データのタイプ
// https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF

// zennの半公式APIから取得できるユーザーの記事データ
// https://zenn.dev/h_ymt/articles/5e44b4967f6764#comment-11db82cbe67ca1

import { z } from "zod";

// ===========================================
// 基本スキーマ
// ===========================================

// タグ/トピックのスキーマ
export const tagSchema = z.object({
  name: z.string().min(1),
});

// ===========================================
// Zenn用スキーマ
// ===========================================

export const zennArticleItemSchema = z.object({
  // Zennの記事APIにトピック(タグ)を取得する機能は無い
  path: z.string().startsWith("/"),
  title: z.string().min(1),
  published_at: z.string(),
  body_updated_at: z.string(),
});

export const zennScrapsItemSchema = z.object({
  path: z.string().startsWith("/"),
  title: z.string().min(1),
  topics: z.array(tagSchema).nullable().default(null),
  created_at: z.string(),
  last_comment_created_at: z.string(),
});

// APIレスポンススキーマ
export const zennArticlesApiResponseSchema = z.object({
  articles: z.array(zennArticleItemSchema),
});

export const zennScrapsApiResponseSchema = z.object({
  scraps: z.array(zennScrapsItemSchema),
});

// ===========================================
// Qiita用スキーマ
// ===========================================

export const qiitaArticleItemSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  tags: z.array(tagSchema),
  created_at: z.string(),
  updated_at: z.string(),
});

export const qiitaApiResponseSchema = z.array(qiitaArticleItemSchema);

// ===========================================
// 共通スキーマ
// ===========================================

export const commonArticleItemSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  article_type: z.enum(["Qiita記事", "Zenn記事", "Zennスクラップ"]),
  tags: z.array(tagSchema).nullable(), // Zennの記事APIにトピック(タグ)を取得する機能ないのでnull可
  created_at: z.string(),
  updated_at: z.string(),
});

// ===========================================
// 型推論のためのヘルパー
// ===========================================

export type ZennArticleItem = z.infer<typeof zennArticleItemSchema>;
export type ZennScrapsItem = z.infer<typeof zennScrapsItemSchema>;
export type QiitaArticleItem = z.infer<typeof qiitaArticleItemSchema>;
export type CommonArticleItem = z.infer<typeof commonArticleItemSchema>;
