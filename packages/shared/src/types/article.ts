import { z } from "zod";

// タグのスキーマ
export const ArticleTagSchema = z.object({
  name: z.string().min(1),
});

// 統合記事型(Qiita/Zenn/Scrap共通フォーマット)
export const UnifiedArticleSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  article_type: z.enum(["Qiita記事", "Zenn記事", "Zennスクラップ"]),
  tags: z.array(ArticleTagSchema).nullable(), // Zennの記事APIにトピック(タグ)を取得する機能ないのでnull可
  created_at: z.string(),
  updated_at: z.string(),
});

export const UnifiedArticleListSchema = z.array(UnifiedArticleSchema);

// TypeScriptの型を生成
export type ArticleTag = z.infer<typeof ArticleTagSchema>;
export type UnifiedArticle = z.infer<typeof UnifiedArticleSchema>;
export type UnifiedArticleList = z.infer<typeof UnifiedArticleListSchema>;
