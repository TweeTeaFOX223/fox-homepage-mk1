import { getGitHubRepositories } from "../api/github";
import { RepositoryCard } from "./RepositoryCard";
import type { GitHubRepository } from "@my-portfolio/shared/types/github";
import { GITHUB_USERNAME } from "../../../../config";
import ViewAllCard from "@/components/ViewAllCard";

// unstable_cacheの設定を継承（このコンポーネント自体は設定不要）

export default async function RepositoryList({ limit }: { limit?: number } = {}) {
  const repos = await getGitHubRepositories(GITHUB_USERNAME, 30);

  // limit が指定されている場合は制限する
  const displayRepos = limit ? repos.slice(0, limit) : repos;
  const showViewAllCard = limit && repos.length > limit;

  // 言語ごとの統計を計算
  const languageCounts = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // 言語を個数でソートし、上位5つを取得
  const repoStats = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([label, count]) => ({ label, count }));

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
        {showViewAllCard && (
          <ViewAllCard
            href="/repositories"
            title="全ての制作物を見る"
            totalCount={repos.length}
            stats={repoStats}
          />
        )}
      </div>
    </div>
  );
}
