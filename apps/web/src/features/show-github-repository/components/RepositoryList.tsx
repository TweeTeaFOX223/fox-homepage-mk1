import { getGitHubRepositories } from "../api/github";
import { RepositoryCard } from "./RepositoryCard";
import type { GitHubRepository } from "@my-portfolio/shared/types/github";
import { GITHUB_USERNAME } from "../../../../config";
import ViewAllCard from "@/components/ViewAllCard";

// unstable_cacheの設定を継承（このコンポーネント自体は設定不要）

export default async function RepositoryList({
  limit,
}: { limit?: number } = {}) {
  const repos = await getGitHubRepositories(GITHUB_USERNAME, 100);

  const nonForkRepos = repos.filter((repo) => !repo.fork);

  // limit が指定されている場合は制限する
  const displayRepos = limit ? nonForkRepos.slice(0, limit) : nonForkRepos;
  const showViewAllCard = limit && nonForkRepos.length > limit;

  // 言語ごとの統計を計算
  const languageCounts = nonForkRepos.reduce((acc, repo) => {
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

  const showTruncationWarning = repos.length >= 100;

  return (
    <div className="w-full space-y-4 p-4">
      <div className="relative p-6 pb-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
          <span className="block sm:inline">GitHub</span>
          <span className="block sm:inline">リポジトリ</span>
        </h2>
        <p className="text-muted-foreground flex items-center justify-center mt-4">
          自分のGitHubのリポジトリの一覧です。全部見るページでフィルタ/ソートできます。
        </p>
        {showTruncationWarning && (
          <p className="mt-4 text-center text-sm font-semibold text-amber-600">
            100件以上のリポジトリがあり取得漏れが起きたようです。コードを修正してください。
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayRepos.map((repo: GitHubRepository) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
        {showViewAllCard && (
          <ViewAllCard
            href="/repositories"
            title="全ての制作物を見る"
            totalCount={nonForkRepos.length}
            stats={repoStats}
          />
        )}
      </div>
    </div>
  );
}
