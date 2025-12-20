import { getGitHubRepositories } from "@/features/show-github-repository/api/github";
import RepositoryListWithControls from "@/features/show-github-repository/components/RepositoryListWithControls";
import { NEXT_PUBLIC_BASE_URL, GITHUB_USERNAME } from "../../../config";

export const metadata = {
  metadataBase: new URL(NEXT_PUBLIC_BASE_URL),
  title: "制作物一覧 - T2フォックスのホームページ",
  description: "GitHub上で公開している制作物の一覧です。",
  openGraph: {
    title: "制作物一覧 - T2フォックスのホームページ",
    description: "GitHub上で公開している制作物の一覧です。",
    images: [
      {
        url: "/ogp/OGP2.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// ISR: 3600秒(1時間)ごとに再生成
export const revalidate = 3600;

export default async function RepositoriesPage() {
  const repos = await getGitHubRepositories(GITHUB_USERNAME, 100);
  const showTruncationWarning = repos.length >= 100;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-4 p-4">
          <div className="relative p-6 pb-4">
            <h1 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
              [制作物(GitHubリポジトリ)]
            </h1>
            <p className="text-muted-foreground flex items-center justify-center mt-4">
              GitHub上で公開している制作物の一覧です。大半はウェブ上で使用可能なものとなっています。
            </p>
            {showTruncationWarning && (
              <p className="mt-4 text-center text-sm font-semibold text-amber-600">
                100件以上のリポジトリがあり取得漏れが起きたようです。コードを修正してください。
              </p>
            )}
          </div>
          <RepositoryListWithControls repos={repos} />
        </div>
      </div>
    </main>
  );
}
