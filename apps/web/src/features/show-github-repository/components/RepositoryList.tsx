import { getGitHubRepositories } from "../api/github";
import { RepositoryCard } from "./RepositoryCard";
import type { GitHubRepository } from "@my-portfolio/shared/types/github";
import { GITHUB_USERNAME } from "../../../../config";
import ViewAllButton from "@/components/ViewAllButton";

// unstable_cacheの設定を継承（このコンポーネント自体は設定不要）

export default async function RepositoryList({ limit }: { limit?: number } = {}) {
  const repos = await getGitHubRepositories(GITHUB_USERNAME, 30);

  // limit が指定されている場合は制限する
  const displayRepos = limit ? repos.slice(0, limit) : repos;
  const showViewAllButton = limit && repos.length > limit;

  return (
    <div className="w-full space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
        制作物(GitHubリポジトリ)
      </h2>
      <p className="text-muted-foreground flex items-center justify-center">
        GitHub上で公開している制作物の一覧です。大半はウェブ上で使用可能なものとなっています。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayRepos.map((repo: GitHubRepository) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      {showViewAllButton && (
        <ViewAllButton href="/repositories" label="全ての制作物を見る" />
      )}
    </div>
  );
}
