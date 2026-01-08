import { apps } from "@/features/show-apps/config/apps";
import { notFound } from "next/navigation";
import { NEXT_PUBLIC_BASE_URL } from "../../../../config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return apps.map((app) => ({
    id: app.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = apps.find((a) => a.id === id);

  if (!app) {
    return {
      title: "アプリが見つかりません",
    };
  }

  const ogImage = app.imageUrls[0] ?? "/ogp/OGP2.png";

  return {
    metadataBase: new URL(NEXT_PUBLIC_BASE_URL),
    title: `${app.name} - T2フォックスのホームページ`,
    description: app.description,
    openGraph: {
      title: `${app.name} - T2フォックスのホームページ`,
      description: app.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = apps.find((a) => a.id === id);

  if (!app) {
    notFound();
  }

  const mainImage = app.imageUrls[0] ?? "/ogp/OGP2.png";

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 戻るボタン */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>

        {/* ヘッダー */}
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-8 border-2 border-cyan-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="relative flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {app.name}
            </h1>
          </div>
        </div>

        {/* メイン画像 */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-8 shadow-2xl">
          <img
            src={mainImage}
            alt={app.name}
            className="absolute inset-0 h-full w-full object-contain"
            loading="lazy"
          />
        </div>

        {/* アプリ詳細 */}
        <div className="space-y-8">
          {/* 説明 */}
          <div className="bg-white p-6 rounded-xl border-2 border-foreground/10 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-foreground">
              アプリについて
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {app.description}
            </p>
          </div>

          {/* タグ */}
          <div className="bg-white p-6 rounded-xl border-2 border-foreground/10 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-foreground">
              使用技術
            </h2>
            <div className="flex flex-wrap gap-3">
              {app.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-foreground border-2 border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
