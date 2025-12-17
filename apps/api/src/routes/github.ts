import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { GitHubService } from "../services/github-service";

type Bindings = {
  GITHUB_TOKEN?: string;
};

const github = new Hono<{ Bindings: Bindings }>();

// GitHubリポジトリ一覧取得
github.get(
  "/repositories/:username",
  zValidator(
    "param",
    z.object({
      username: z.string().min(1).max(39),
    })
  ),
  zValidator(
    "query",
    z.object({
      per_page: z.coerce.number().min(1).max(100).optional().default(30),
    })
  ),
  async (c) => {
    const { username } = c.req.valid("param");
    const { per_page } = c.req.valid("query");

    try {
      const service = new GitHubService(c.env);
      const repositories = await service.getUserRepositories(username, per_page);

      return c.json({ repositories });
    } catch (error) {
      console.error("GitHub route error:", error);
      return c.json({ error: "Failed to fetch GitHub repositories" }, 500);
    }
  }
);

export default github;
