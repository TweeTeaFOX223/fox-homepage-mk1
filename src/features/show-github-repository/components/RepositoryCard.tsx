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

import { RepoCardItem } from "../types/github-repo-type";

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

      <CardContent className="flex-grow space-x-4 space-y-4">
        <div className="flex flex-nowrap items-center gap-3 text-sm text-muted-foreground">
          {repo.language && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span style={{ color: "red" }}>{repo.language}</span>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            作成: {new Date(repo.created_at).toLocaleDateString()}
          </div>

          <div className="text-xs text-muted-foreground">
            最終更新: {new Date(repo.updated_at).toLocaleDateString()}
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
