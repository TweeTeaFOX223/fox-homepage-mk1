"use client";

import { useState, useMemo } from "react";
import type { GitHubRepository } from "@my-portfolio/shared/types/github";
import { RepositoryCard } from "./RepositoryCard";
import RepositoryListRow from "./RepositoryListRow";
import ListControls, { SortField, SortOrder, ViewMode } from "@/components/ListControls";

interface RepositoryListWithControlsProps {
  repos: GitHubRepository[];
}

export default function RepositoryListWithControls({
  repos,
}: RepositoryListWithControlsProps) {
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // ソートされたリポジトリリスト
  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      const dateA = new Date(sortField === "created" ? a.created_at : a.updated_at);
      const dateB = new Date(sortField === "created" ? b.created_at : b.updated_at);

      if (sortOrder === "desc") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  }, [repos, sortField, sortOrder]);

  return (
    <>
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
