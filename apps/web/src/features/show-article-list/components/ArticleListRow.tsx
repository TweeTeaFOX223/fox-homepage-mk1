import { CommonArticleItem } from "../schemas/article-schemas";
import { formatDateJP } from "@/lib/data-utils";

export default function ArticleListRow({
  article,
}: {
  article: CommonArticleItem;
}) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-foreground/5"
    >
      <div className="flex-1 min-w-0 pr-4">
        <h3 className="text-base font-semibold text-foreground hover:underline truncate">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span className="px-2 py-0.5 rounded bg-foreground/10 font-medium">
            {article.article_type}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs text-muted-foreground whitespace-nowrap">
        <div className="text-right">
          <div className="text-muted-foreground/70">作成</div>
          <div className="font-medium">{formatDateJP(article.created_at)}</div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground/70">最終更新</div>
          <div className="font-medium">{formatDateJP(article.updated_at)}</div>
        </div>
      </div>
    </a>
  );
}
