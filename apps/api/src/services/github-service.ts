import {
  GitHubRepositoryListSchema,
  type GitHubRepository,
} from "@my-portfolio/shared/types/github";

type Bindings = {
  GITHUB_TOKEN?: string;
};

export class GitHubService {
  private readonly baseURL = "https://api.github.com";
  private readonly token?: string;

  constructor(env: Bindings) {
    this.token = env.GITHUB_TOKEN;
  }

  async getUserRepositories(username: string, perPage: number = 30): Promise<GitHubRepository[]> {
    if (!this.token) {
      throw new Error("GITHUB_TOKEN is not configured");
    }

    try {
      const headers: Record<string, string> = {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      };

      const response = await fetch(
        `${this.baseURL}/users/${username}/repos?sort=updated&per_page=${perPage}`,
        { headers }
      );

      if (!response.ok) {
        console.error("GitHub API error:", response.status, response.statusText);
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const validated = GitHubRepositoryListSchema.parse(data);

      return validated;
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      throw error;
    }
  }
}
