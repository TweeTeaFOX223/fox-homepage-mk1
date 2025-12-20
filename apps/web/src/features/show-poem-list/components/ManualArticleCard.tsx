"use client";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ManualArticleItem } from "../types/manual-article-type";
import { formatDateJP } from "@/lib/data-utils";

type ManualArticleCardProps = {
  article: ManualArticleItem;
};

export default function ManualArticleCard({ article }: ManualArticleCardProps) {
  return (
    <Card className="flex flex-col h-full p-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
      >
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground font-semibold">
            NO IMAGE
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          記事を開く
        </div>
      </a>

      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-sm">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {article.title}
          </a>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-row justify-start space-x-2">
            {article.description}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow space-x-4 space-y-4 pt-0">
        <div className="flex flex-nowrap items-center gap-3 text-sm text-muted-foreground">
          <div className="text-xs text-muted-foreground">
            作成: {formatDateJP(article.created_at)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
