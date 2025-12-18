import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { QiitaService } from "../services/qiita-service";
import { ZennService } from "../services/zenn-service";
import type { UnifiedArticle } from "@my-portfolio/shared/types/article";

type Bindings = {
  QIITA_TOKEN?: string;
};

// Qiita + Zenn 統合エンドポイント
const articles = new Hono<{ Bindings: Bindings }>().get(
  "/unified",
  zValidator(
    "query",
    z.object({
      zenn_username: z.string().optional(),
      limit: z.coerce.number().min(1).max(100).optional().default(30),
    })
  ),
  async (c) => {
    const { zenn_username, limit } = c.req.valid("query");

    if (!zenn_username) {
      return c.json({ error: "zenn_username is required" }, 400);
    }

    try {
      const qiitaService = new QiitaService(c.env);
      const zennService = new ZennService();

      // 並行で取得
      const [qiitaArticles, zennArticles, zennScraps] = await Promise.allSettled([
        qiitaService.getAuthenticatedUserArticles(limit),
        zennService.getUserArticles(zenn_username),
        zennService.getUserScraps(zenn_username),
      ]);

      // 統合フォーマットに変換
      const unifiedArticles: UnifiedArticle[] = [];

      // Qiita記事を変換
      if (qiitaArticles.status === "fulfilled") {
        unifiedArticles.push(
          ...qiitaArticles.value.map((article) => ({
            url: article.url,
            title: article.title,
            article_type: "Qiita記事" as const,
            tags: article.tags,
            created_at: article.created_at,
            updated_at: article.updated_at,
          }))
        );
      }

      // Zenn記事を変換
      if (zennArticles.status === "fulfilled") {
        unifiedArticles.push(
          ...zennArticles.value.map((article) => ({
            url: `https://zenn.dev${article.path}`,
            title: article.title,
            article_type: "Zenn記事" as const,
            tags: null,
            created_at: article.published_at,
            updated_at: article.body_updated_at,
          }))
        );
      }

      // Zennスクラップを変換
      if (zennScraps.status === "fulfilled") {
        unifiedArticles.push(
          ...zennScraps.value.map((scrap) => ({
            url: `https://zenn.dev${scrap.path}`,
            title: scrap.title,
            article_type: "Zennスクラップ" as const,
            tags: scrap.topics,
            created_at: scrap.created_at,
            updated_at: scrap.last_comment_created_at,
          }))
        );
      }

      // 更新日時でソート(新しい順)
      unifiedArticles.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      return c.json({
        articles: unifiedArticles.slice(0, limit),
        meta: {
          qiita_count: qiitaArticles.status === "fulfilled" ? qiitaArticles.value.length : 0,
          zenn_articles_count:
            zennArticles.status === "fulfilled" ? zennArticles.value.length : 0,
          zenn_scraps_count: zennScraps.status === "fulfilled" ? zennScraps.value.length : 0,
        },
      });
    } catch (error) {
      console.error("Unified articles route error:", error);
      return c.json({ error: "Failed to fetch articles" }, 500);
    }
  }
);

export default articles;
