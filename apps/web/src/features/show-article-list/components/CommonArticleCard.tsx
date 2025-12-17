// app/components/RepositoryCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommonArticleItem } from "../schemas/article-schemas";
import { formatDateJP } from "@/lib/data-utils";
// import { Badge } from "@/components/ui/badge";
// import { Star } from "lucide-react";

export default function CommonArticleCard({
  article,
}: {
  article: CommonArticleItem;
}) {
  return (
    <Card className="flex flex-col h-full p-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardHeader>
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
        {article.tags && (
          <CardDescription>
            <div className="flex flex-row justify-start space-x-2">
              {article.tags &&
                article.tags?.map((tag) => (
                  <div key={tag.name}>{tag.name}</div>
                ))}
            </div>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-grow space-x-4 space-y-4">
        <div className="flex flex-nowrap items-center gap-3 text-sm text-muted-foreground">
          <div className="text-xs text-muted-foreground">
            {article.article_type}
          </div>

          <div className="text-xs text-muted-foreground">
            作成: {formatDateJP(article.created_at)}
          </div>

          <div className="text-xs text-muted-foreground">
            最終更新: {formatDateJP(article.updated_at)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
