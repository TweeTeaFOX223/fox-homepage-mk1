"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, ArrowUpDown } from "lucide-react";

export type SortField = "created" | "updated";
export type SortOrder = "desc" | "asc";
export type ViewMode = "grid" | "list";

interface ListControlsProps {
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
  onViewModeChange: (mode: ViewMode) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  viewMode: ViewMode;
}

export default function ListControls({
  onSortFieldChange,
  onSortOrderChange,
  onViewModeChange,
  sortField,
  sortOrder,
  viewMode,
}: ListControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 mb-4 bg-gradient-to-r from-foreground/5 to-transparent border-2 border-foreground/10 rounded-lg">
      {/* ソートフィールド選択 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-muted-foreground">
          並び替え:
        </span>
        <div className="flex gap-1">
          <Button
            variant={sortField === "created" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortFieldChange("created")}
            className="text-xs"
          >
            作成日
          </Button>
          <Button
            variant={sortField === "updated" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortFieldChange("updated")}
            className="text-xs"
          >
            最終更新日
          </Button>
        </div>
      </div>

      {/* ソート順序選択 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-muted-foreground">
          順序:
        </span>
        <div className="flex gap-1">
          <Button
            variant={sortOrder === "desc" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortOrderChange("desc")}
            className="text-xs flex items-center gap-1"
          >
            <ArrowUpDown className="w-3 h-3" />
            新しい順
          </Button>
          <Button
            variant={sortOrder === "asc" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortOrderChange("asc")}
            className="text-xs flex items-center gap-1"
          >
            <ArrowUpDown className="w-3 h-3" />
            古い順
          </Button>
        </div>
      </div>

      {/* 表示モード選択 */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm font-semibold text-muted-foreground">
          表示:
        </span>
        <div className="flex gap-1">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className="text-xs flex items-center gap-1"
          >
            <LayoutGrid className="w-3 h-3" />
            タイル
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className="text-xs flex items-center gap-1"
          >
            <List className="w-3 h-3" />
            一覧
          </Button>
        </div>
      </div>
    </div>
  );
}
