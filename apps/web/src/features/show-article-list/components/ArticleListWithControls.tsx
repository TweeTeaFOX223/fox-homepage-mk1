"use client";

import { useState, useMemo } from "react";
import type { UnifiedArticle } from "@my-portfolio/shared/types/article";
import CommonArticleCard from "./CommonArticleCard";
import ArticleListRow from "./ArticleListRow";
import ListControls, { SortField, SortOrder, ViewMode } from "@/components/ListControls";

interface ArticleListWithControlsProps {
  articles: UnifiedArticle[];
}

export default function ArticleListWithControls({
  articles,
}: ArticleListWithControlsProps) {
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // ソートされた記事リスト
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const dateA = new Date(sortField === "created" ? a.created_at : a.updated_at);
      const dateB = new Date(sortField === "created" ? b.created_at : b.updated_at);

      if (sortOrder === "desc") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  }, [articles, sortField, sortOrder]);

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
          {sortedArticles.map((article) => (
            <CommonArticleCard key={article.url} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedArticles.map((article) => (
            <ArticleListRow key={article.url} article={article} />
          ))}
        </div>
      )}
    </>
  );
}
