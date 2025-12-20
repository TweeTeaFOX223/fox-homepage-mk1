"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppItem } from "../config/apps";

export default function AppListRow({ app }: { app: AppItem }) {
  return (
    <a href={app.appUrl} target="_blank" rel="noopener noreferrer">
      <Card className="flex flex-col gap-2 p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="p-0">
          <CardTitle className="text-base sm:text-lg">{app.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-2">
          <p
            className="text-sm text-muted-foreground line-clamp-3 cursor-help"
            title={app.description}
          >
            {app.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded-md bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 text-foreground border border-orange-500/25">
              {app.deploymentType}
            </span>
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-foreground/5 text-foreground border border-foreground/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
