import { devReflections } from "../config/dev-reflection";
import DevReflectionCard from "./DevReflectionCard";

export default function DevReflectionList() {
  return (
    <div className="w-full space-y-4 p-4">
      <div className="relative p-6 pb-4">
        <h1 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
          開発方針＆振り返り
        </h1>
        <p className="text-muted-foreground flex items-center justify-center mt-4">
          開発に関する方針や振り返りをまとめた記事です。
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {devReflections.map((article) => (
          <DevReflectionCard key={article.title} article={article} />
        ))}
      </div>
    </div>
  );
}
