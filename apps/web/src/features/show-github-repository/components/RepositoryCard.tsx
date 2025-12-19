// app/components/RepositoryCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Star } from "lucide-react";

import { RepoCardItem } from "../schemas/github-repo-schema";
import { formatDateJP } from "@/lib/data-utils";

export const RepositoryCard = ({ repo }: { repo: RepoCardItem }) => {
  return (
    <Card className="flex flex-col h-full p-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {repo.name}
          </a>
        </CardTitle>
        {repo.description && (
          <CardDescription className="">{repo.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-grow space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {repo.language && (
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-foreground border border-purple-300/30">
              {repo.language}
            </span>
          )}

          <div className="text-xs text-muted-foreground">
            作成: {formatDateJP(repo.created_at)}
          </div>

          <div className="text-xs text-muted-foreground">
            最終更新: {formatDateJP(repo.created_at)}
          </div>

          {/* <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div> */}
        </div>
      </CardContent>

      {/* <CardFooter className="flex flex-col items-start gap-3">
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {repo.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
            {repo.topics.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{repo.topics.length - 3}
              </span>
            )}
          </div>
        )}
      </CardFooter> */}
    </Card>
  );
};
