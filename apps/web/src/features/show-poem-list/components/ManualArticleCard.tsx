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
        <CardDescription>
          <div className="flex flex-row justify-start space-x-2">
            {article.description}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow space-x-4 space-y-4">
        <div className="flex flex-nowrap items-center gap-3 text-sm text-muted-foreground">
          <div className="text-xs text-muted-foreground">
            作成: {formatDateJP(article.created_at)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
