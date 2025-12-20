import { RepoCardItem } from "../schemas/github-repo-schema";
import { formatDateJP } from "@/lib/data-utils";

export default function RepositoryListRow({
  repo,
}: {
  repo: RepoCardItem;
}) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-foreground/5"
    >
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="text-base font-semibold text-foreground hover:underline truncate">
          {repo.name}
        </h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words mt-1">
          {repo.description || "説明なし"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          {repo.language && (
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-foreground border border-purple-300/30">
              {repo.language}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs text-muted-foreground whitespace-nowrap">
        <div className="text-right">
          <div className="text-muted-foreground/70">作成</div>
          <div className="font-medium">{formatDateJP(repo.created_at)}</div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground/70">最終更新</div>
          <div className="font-medium">{formatDateJP(repo.updated_at)}</div>
        </div>
      </div>
    </a>
  );
}
