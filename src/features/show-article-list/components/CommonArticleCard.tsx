// app/components/RepositoryCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QiitaArticleItem } from "../types/article-item-type";
// import { Badge } from "@/components/ui/badge";
// import { Star } from "lucide-react";

export default function CommonArticleCard({
  article,
}: {
  article: QiitaArticleItem;
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
            作成: {new Date(article.created_at).toLocaleDateString()}
          </div>

          <div className="text-xs text-muted-foreground">
            最終更新: {new Date(article.updated_at).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
