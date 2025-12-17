import {
  QiitaArticleListSchema,
  type QiitaArticle,
} from "@my-portfolio/shared/types/qiita";

type Bindings = {
  QIITA_TOKEN?: string;
};

export class QiitaService {
  private readonly baseURL = "https://qiita.com/api/v2";
  private readonly token?: string;

  constructor(env: Bindings) {
    this.token = env.QIITA_TOKEN;
  }

  async getAuthenticatedUserArticles(perPage: number = 20): Promise<QiitaArticle[]> {
    if (!this.token) {
      throw new Error("QIITA_TOKEN is not configured");
    }

    try {
      const response = await fetch(
        `${this.baseURL}/authenticated_user/items?per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Qiita API error:", response.status, response.statusText);
        throw new Error(`Qiita API error: ${response.status}`);
      }

      const data = await response.json();
      const validated = QiitaArticleListSchema.parse(data);

      return validated;
    } catch (error) {
      console.error("Error fetching Qiita articles:", error);
      throw error;
    }
  }
}
