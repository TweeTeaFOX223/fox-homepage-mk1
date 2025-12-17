import {
  ZennArticleListSchema,
  ZennScrapListSchema,
  type ZennArticle,
  type ZennScrap,
} from "@my-portfolio/shared/types/zenn";

export class ZennService {
  private readonly baseURL = "https://zenn.dev/api";

  async getUserArticles(username: string): Promise<ZennArticle[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/articles?username=${username}&order=latest`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Zenn API error:", response.status, response.statusText);
        throw new Error(`Zenn API error: ${response.status}`);
      }

      const data = await response.json();
      const validated = ZennArticleListSchema.parse(data);

      return validated.articles;
    } catch (error) {
      console.error("Error fetching Zenn articles:", error);
      throw error;
    }
  }

  async getUserScraps(username: string): Promise<ZennScrap[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/scraps?username=${username}&order=latest`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Zenn Scraps API error:", response.status, response.statusText);
        throw new Error(`Zenn Scraps API error: ${response.status}`);
      }

      const data = await response.json();
      const validated = ZennScrapListSchema.parse(data);

      return validated.scraps;
    } catch (error) {
      console.error("Error fetching Zenn scraps:", error);
      throw error;
    }
  }
}
