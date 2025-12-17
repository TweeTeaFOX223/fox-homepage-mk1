import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { ZennService } from "../services/zenn-service";

const zenn = new Hono();

// Zenn記事一覧取得
zenn.get(
  "/articles/:username",
  zValidator(
    "param",
    z.object({
      username: z.string().min(1),
    })
  ),
  async (c) => {
    const { username } = c.req.valid("param");

    try {
      const service = new ZennService();
      const articles = await service.getUserArticles(username);

      return c.json({ articles });
    } catch (error) {
      console.error("Zenn articles route error:", error);
      return c.json({ error: "Failed to fetch Zenn articles" }, 500);
    }
  }
);

// Zennスクラップ一覧取得
zenn.get(
  "/scraps/:username",
  zValidator(
    "param",
    z.object({
      username: z.string().min(1),
    })
  ),
  async (c) => {
    const { username } = c.req.valid("param");

    try {
      const service = new ZennService();
      const scraps = await service.getUserScraps(username);

      return c.json({ scraps });
    } catch (error) {
      console.error("Zenn scraps route error:", error);
      return c.json({ error: "Failed to fetch Zenn scraps" }, 500);
    }
  }
);

export default zenn;
