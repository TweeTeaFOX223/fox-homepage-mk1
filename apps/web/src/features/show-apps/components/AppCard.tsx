import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppItem } from "../config/apps";
import Link from "next/link";
import Image from "next/image";

export default function AppCard({ app }: { app: AppItem }) {
  const statusColors = {
    運用中: "from-emerald-500/20 via-green-500/20 to-teal-500/20 border-emerald-500/30",
    開発中: "from-blue-500/20 via-cyan-500/20 to-sky-500/20 border-blue-500/30",
    停止中: "from-gray-500/20 via-slate-500/20 to-zinc-500/20 border-gray-500/30",
  };

  const statusTextColors = {
    運用中: "text-emerald-600",
    開発中: "text-blue-600",
    停止中: "text-gray-600",
  };

  return (
    <Link href={app.detailPath} className="block h-full group">
      <Card className="relative overflow-hidden flex flex-col h-full p-2 bg-white border-2 border-foreground/10 rounded-lg shadow-sm hover:shadow-2xl hover:border-foreground/30 transition-all duration-300 hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>

        {/* アプリ画像 */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-3">
          <Image
            src={app.imageUrl}
            alt={app.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader className="relative p-3 pb-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-lg font-bold text-foreground group-hover:text-cyan-600 transition-colors line-clamp-2">
              {app.name}
            </CardTitle>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap bg-gradient-to-r ${statusColors[app.status]}`}
            >
              <span className={statusTextColors[app.status]}>{app.status}</span>
            </span>
          </div>
        </CardHeader>

        <CardContent className="relative flex-grow p-3 pt-0 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {app.description}
          </p>

          {/* タグ */}
          <div className="flex flex-wrap gap-2">
            {app.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-foreground border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
