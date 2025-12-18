import RepositoryList from "@/features/show-github-repository/components/RepositoryList";
import { NEXT_PUBLIC_BASE_URL } from "../../../config";

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

export default function RepositoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <RepositoryList />
      </div>
    </main>
  );
}
