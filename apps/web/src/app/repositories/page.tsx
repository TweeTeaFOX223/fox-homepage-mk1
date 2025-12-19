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
  const repos = await getGitHubRepositories(GITHUB_USERNAME, 30);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-4 p-4">
          <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
            制作物(GitHubリポジトリ)
          </h1>
          <p className="text-muted-foreground flex items-center justify-center mb-6">
            GitHub上で公開している制作物の一覧です。大半はウェブ上で使用可能なものとなっています。
          </p>
          <RepositoryListWithControls repos={repos} />
        </div>
      </div>
    </main>
  );
}
