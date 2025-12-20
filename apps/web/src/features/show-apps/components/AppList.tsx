import { apps } from "../config/apps";
import AppCard from "./AppCard";
import ViewAllCard from "@/components/ViewAllCard";

type AppListProps = {
  limit?: number;
};

export default function AppList({ limit }: AppListProps = {}) {
  const sortedApps = [...apps].sort((a, b) => a.displayOrder - b.displayOrder);
  const displayApps = limit ? sortedApps.slice(0, limit) : sortedApps;
  const showViewAllCard = Boolean(limit && sortedApps.length > limit);

  const deploymentStats = sortedApps.reduce((acc, app) => {
    acc[app.deploymentType] = (acc[app.deploymentType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deploymentOrder: string[] = [
    "ウェブアプリ(すぐに使用可能！)",
    "デスクトップアプリ(PCにインストール)",
    "コンソールアプリ(ターミナルで実行)",
    "その他(データや情報集など)",
  ];

  const appStats = deploymentOrder
    .filter((label) => deploymentStats[label])
    .map((label) => ({
      label: label.replace(/[（(].*?[）)]/g, "").trim(),
      count: deploymentStats[label],
    }));

  return (
    <div className="w-full space-y-4 p-4">
      <div className="relative p-6 pb-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
          [公開中のアプリ]
        </h2>
        <p className="text-muted-foreground flex items-center justify-center mt-4">
          実際に使えるウェブアプリケーション
        </p>
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground font-medium">
            現在公開中のアプリはありません
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            新しいアプリを準備中です
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
          {showViewAllCard && (
            <ViewAllCard
              href="/apps"
              title="全てのアプリを見る"
              totalCount={sortedApps.length}
              stats={appStats}
            />
          )}
        </div>
      )}
    </div>
  );
}
