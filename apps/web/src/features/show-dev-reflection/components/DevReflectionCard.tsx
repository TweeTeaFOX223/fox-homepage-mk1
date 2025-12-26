"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DevReflectionItem } from "../types/dev-reflection-type";
import { formatDateJP } from "@/lib/data-utils";

type DevReflectionCardProps = {
  article: DevReflectionItem;
};

export default function DevReflectionCard({ article }: DevReflectionCardProps) {
  return (
    <Card className="flex flex-col h-full p-2 bg-white border rounded-lg shadow-sm transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">
          <span className="text-foreground">{article.title}</span>
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
            最終更新: {formatDateJP(article.updated_at)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
