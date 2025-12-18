import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { QiitaService } from "../services/qiita-service";

type Bindings = {
  QIITA_TOKEN?: string;
};

// 認証されたユーザーのQiita記事一覧取得
const qiita = new Hono<{ Bindings: Bindings }>().get(
  "/articles",
  zValidator(
    "query",
    z.object({
      per_page: z.coerce.number().min(1).max(100).optional().default(20),
    })
  ),
  async (c) => {
    const { per_page } = c.req.valid("query");

    try {
      const service = new QiitaService(c.env);
      const articles = await service.getAuthenticatedUserArticles(per_page);

      return c.json({ articles });
    } catch (error) {
      console.error("Qiita route error:", error);
      return c.json({ error: "Failed to fetch Qiita articles" }, 500);
    }
  }
);

export default qiita;
