import { apps } from "../config/apps";
import AppCard from "./AppCard";

export default function AppList() {
  return (
    <div className="w-full space-y-4 p-4">
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6 border-2 border-cyan-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <h2 className="relative text-3xl font-black text-center bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          公開中のアプリ
        </h2>
        <p className="relative text-center mt-3 text-base text-muted-foreground font-medium">
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
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
