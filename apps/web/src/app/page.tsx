import type { ReactNode } from "react";
import BaseProfile from "@/features/base-profile/components/BaseProfile";
// import TechInterests from "@/features/interested-technology/components/TechInterests";
import ArticleList from "@/features/show-article-list/components/ArticleList";
import RepositoryList from "@/features/show-github-repository/components/RepositoryList";
import ManualArticleList from "@/features/show-poem-list/components/ManualArticleList";
import AppList from "@/features/show-apps/components/AppList";
import DevReflectionList from "@/features/show-dev-reflection/components/DevReflectionList";
import { NEXT_PUBLIC_BASE_URL } from "../../config";

export const metadata = {
  metadataBase: new URL(NEXT_PUBLIC_BASE_URL),
  title: "T2フォックスのホームページ",
  description: "これはT2フォックスの制作物をまとめたホームページです。",
  openGraph: {
    title: "T2フォックスのホームページ",
    description: "これはT2フォックスの制作物をまとめたホームページです。",
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

type SectionCardProps = {
  children: ReactNode;
  className: string;
  glowA: string;
  glowB: string;
};

function SectionCard({ children, className, glowA, glowB }: SectionCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border-2 ${className}`}
    >
      <div className={`absolute inset-0 ${glowA}`}></div>
      <div className={`absolute inset-0 ${glowB}`}></div>
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionSeparator() {
  return (
    <div className="my-8 md:my-12 lg:my-16">
      <div className="h-3 w-full rounded-full bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_22px,transparent_22px,transparent_32px)]" />
    </div>
  );
}

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mx-auto w-fit text-4xl md:text-5xl font-black tracking-wide text-orange-400">
          <span className="block sm:inline">T2フォックス</span>
          <span className="block sm:inline">のホームページ</span>
        </h1>
        <section id="profile" className="mt-8 scroll-my-16">
          <BaseProfile />
        </section>

        <SectionSeparator />

        <section id="apps" className="scroll-my-16">
          <SectionCard
            className="bg-gradient-to-br from-pink-500/10 via-fuchsia-500/10 to-amber-500/10 border-pink-500/20"
            glowA="bg-[radial-gradient(circle_at_30%_20%,rgba(244,114,182,0.12),transparent_55%)]"
            glowB="bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.12),transparent_55%)]"
          >
            <div className="md:hidden">
              <AppList limit={3} />
            </div>
            <div className="hidden md:block">
              <AppList limit={5} />
            </div>
          </SectionCard>
        </section>

        {/* <section id="interest-tech" className="mt-8 scroll-my-16">
          <SectionCard
            className="bg-gradient-to-br from-slate-500/10 via-gray-500/10 to-emerald-500/10 border-slate-500/20"
            glowA="bg-[radial-gradient(circle_at_25%_25%,rgba(148,163,184,0.12),transparent_55%)]"
            glowB="bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.1),transparent_55%)]"
          >
            <TechInterests />
          </SectionCard>
        </section> */}

        <SectionSeparator />

        <section id="dev-reflection" className="scroll-my-16">
          <SectionCard
            className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border-amber-500/20"
            glowA="bg-[radial-gradient(circle_at_25%_25%,rgba(251,191,36,0.12),transparent_55%)]"
            glowB="bg-[radial-gradient(circle_at_75%_75%,rgba(244,63,94,0.12),transparent_55%)]"
          >
            <DevReflectionList />
          </SectionCard>
        </section>

        <SectionSeparator />

        <section id="poem-articles" className="scroll-my-16">
          <SectionCard
            className="bg-gradient-to-br from-rose-500/10 via-orange-500/10 to-amber-500/10 border-rose-500/20"
            glowA="bg-[radial-gradient(circle_at_20%_30%,rgba(244,63,94,0.12),transparent_55%)]"
            glowB="bg-[radial-gradient(circle_at_80%_70%,rgba(251,146,60,0.12),transparent_55%)]"
          >
            {/* ここに最新の記事 */}
            <ManualArticleList />
          </SectionCard>
        </section>

        <SectionSeparator />

        <section id="tech-articles" className="scroll-my-16">
          <SectionCard
            className="bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-rose-500/10 border-indigo-500/20"
            glowA="bg-[radial-gradient(circle_at_30%_20%,rgba(129,140,248,0.12),transparent_55%)]"
            glowB="bg-[radial-gradient(circle_at_70%_80%,rgba(251,113,133,0.12),transparent_55%)]"
          >
            {/* ここに最新の記事 */}
            <div className="md:hidden">
              <ArticleList limit={3} />
            </div>
            <div className="hidden md:block">
              <ArticleList limit={5} />
            </div>
          </SectionCard>
        </section>

        <SectionSeparator />

        <section id="products" className="scroll-my-16">
          <SectionCard
            className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-amber-500/10 border-emerald-500/20"
            glowA="bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.12),transparent_55%)]"
            glowB="bg-[radial-gradient(circle_at_75%_75%,rgba(251,191,36,0.12),transparent_55%)]"
          >
            {/* ここに最新にリポジトリ */}
            <div className="md:hidden">
              <RepositoryList limit={3} />
            </div>
            <div className="hidden md:block">
              <RepositoryList limit={5} />
            </div>
          </SectionCard>
        </section>
      </div>
    </main>
  );
}
