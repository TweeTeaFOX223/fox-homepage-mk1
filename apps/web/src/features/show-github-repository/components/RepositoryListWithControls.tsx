"use client";

import { useState, useMemo } from "react";
import type { GitHubRepository } from "@my-portfolio/shared/types/github";
import { RepositoryCard } from "./RepositoryCard";
import RepositoryListRow from "./RepositoryListRow";
import ListControls, {
  SortField,
  SortOrder,
  ViewMode,
} from "@/components/ListControls";
import { Button } from "@/components/ui/button";

interface RepositoryListWithControlsProps {
  repos: GitHubRepository[];
}

export default function RepositoryListWithControls({
  repos,
}: RepositoryListWithControlsProps) {
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterMode, setFilterMode] = useState<"mine" | "forks" | "all">(
    "mine"
  );
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const languageLabel = languageFilter === "all" ? "全て" : languageFilter;

  const languageOptions = useMemo(() => {
    const languages = repos
      .map((repo) => repo.language)
      .filter((language): language is string => Boolean(language));
    return Array.from(new Set(languages)).sort((a, b) =>
      a.localeCompare(b, "ja")
    );
  }, [repos]);

  // フィルタ後にソートされたリポジトリリスト
  const sortedRepos = useMemo(() => {
    const filtered = repos.filter((repo) => {
      if (filterMode === "mine") return !repo.fork;
      if (filterMode === "forks") return repo.fork;
      return true;
    });

    const languageFiltered =
      languageFilter === "all"
        ? filtered
        : filtered.filter((repo) => repo.language === languageFilter);

    return [...languageFiltered].sort((a, b) => {
      const dateA = new Date(
        sortField === "created" ? a.created_at : a.updated_at
      );
      const dateB = new Date(
        sortField === "created" ? b.created_at : b.updated_at
      );

      if (sortOrder === "desc") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  }, [repos, sortField, sortOrder, filterMode, languageFilter]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 p-4 mb-4 bg-gradient-to-r from-foreground/5 to-transparent border-2 border-foreground/10 rounded-lg">
        <span className="text-sm font-semibold text-muted-foreground">
          リポジトリの種類:
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
        <span className="text-sm font-semibold text-muted-foreground">
          言語フィルター:
        </span>
        <Button
          variant={isLanguageModalOpen ? "default" : "outline"}
          size="sm"
          onClick={() => setIsLanguageModalOpen(true)}
          className="text-xs"
        >
          言語: {languageLabel}
        </Button>
      </div>
      {isLanguageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsLanguageModalOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-[min(520px,92vw)] max-h-[80vh] overflow-auto rounded-xl bg-background p-6 shadow-2xl border border-foreground/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">プログラミング言語</h3>
              <button
                type="button"
                onClick={() => setIsLanguageModalOpen(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                閉じる
              </button>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-medium py-1">
                <input
                  type="radio"
                  name="language-filter"
                  value="all"
                  checked={languageFilter === "all"}
                  onChange={() => setLanguageFilter("all")}
                  className="h-5 w-5"
                />
                全て
              </label>
              {languageOptions.map((language) => (
                <label
                  key={language}
                  className="flex items-center gap-3 text-sm font-medium py-1"
                >
                  <input
                    type="radio"
                    name="language-filter"
                    value={language}
                    checked={languageFilter === language}
                    onChange={() => setLanguageFilter(language)}
                    className="h-5 w-5"
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
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
