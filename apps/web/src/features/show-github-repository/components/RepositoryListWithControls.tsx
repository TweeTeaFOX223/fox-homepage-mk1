"use client";

import { useEffect, useState, useMemo } from "react";
import type { GitHubRepository } from "@my-portfolio/shared/types/github";
import { RepositoryCard } from "./RepositoryCard";
import RepositoryListRow from "./RepositoryListRow";
import ListControls, { SortField, SortOrder, ViewMode } from "@/components/ListControls";
import { Button } from "@/components/ui/button";

interface RepositoryListWithControlsProps {
  repos: GitHubRepository[];
}

export default function RepositoryListWithControls({
  repos,
}: RepositoryListWithControlsProps) {
  useEffect(() => {
    console.log(
      "[RepositoryListWithControls] fork status",
      repos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fork: repo.fork,
      }))
    );
  }, [repos]);
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterMode, setFilterMode] = useState<"mine" | "forks" | "all">("mine");

  // フィルタ後にソートされたリポジトリリスト
  const sortedRepos = useMemo(() => {
    const filtered = repos.filter((repo) => {
      if (filterMode === "mine") return !repo.fork;
      if (filterMode === "forks") return repo.fork;
      return true;
    });

    return [...filtered].sort((a, b) => {
      const dateA = new Date(sortField === "created" ? a.created_at : a.updated_at);
      const dateB = new Date(sortField === "created" ? b.created_at : b.updated_at);

      if (sortOrder === "desc") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  }, [repos, sortField, sortOrder, filterMode]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 p-4 mb-4 bg-gradient-to-r from-foreground/5 to-transparent border-2 border-foreground/10 rounded-lg">
        <span className="text-sm font-semibold text-muted-foreground">
          表示フィルター:
        </span>
        <Button
          variant={filterMode === "mine" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterMode("mine")}
          className="text-xs"
        >
          自分のだけ
        </Button>
        <Button
          variant={filterMode === "forks" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterMode("forks")}
          className="text-xs"
        >
          Forkだけ
        </Button>
        <Button
          variant={filterMode === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterMode("all")}
          className="text-xs"
        >
          全部
        </Button>
      </div>
      <ListControls
        sortField={sortField}
        sortOrder={sortOrder}
        viewMode={viewMode}
        onSortFieldChange={setSortField}
        onSortOrderChange={setSortOrder}
        onViewModeChange={setViewMode}
      />

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedRepos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedRepos.map((repo) => (
            <RepositoryListRow key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </>
  );
}
