"use client";

import { useMemo, useState } from "react";
import type { AppItem } from "../config/apps";
import AppCard from "./AppCard";
import AppListRow from "./AppListRow";
import ListControls, {
  SortField,
  SortOrder,
  ViewMode,
} from "@/components/ListControls";
import { Button } from "@/components/ui/button";

interface AppListWithControlsProps {
  apps: AppItem[];
}

const deploymentOrder = [
  "ウェブアプリ(すぐに使用可能！)",
  "デスクトップアプリ(PCにインストール)",
  "コンソールアプリ(ターミナルで実行)",
  "その他(データや情報集など)",
];

export default function AppListWithControls({
  apps,
}: AppListWithControlsProps) {
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

  const typeOptions = useMemo(() => {
    const available = new Set(apps.map((app) => app.deploymentType));
    return deploymentOrder.filter((type) => available.has(type));
  }, [apps]);

  const typeLabel = typeFilter === "all" ? "全て" : typeFilter;

  const sortedApps = useMemo(() => {
    const filtered =
      typeFilter === "all"
        ? apps
        : apps.filter((app) => app.deploymentType === typeFilter);

    return [...filtered].sort((a, b) => {
      const dateA = new Date(
        sortField === "created" ? a.createdAt : a.updatedAt
      );
      const dateB = new Date(
        sortField === "created" ? b.createdAt : b.updatedAt
      );

      if (sortOrder === "desc") {
        return dateB.getTime() - dateA.getTime();
      }
      return dateA.getTime() - dateB.getTime();
    });
  }, [apps, typeFilter, sortField, sortOrder]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 p-4 mb-4 bg-gradient-to-r from-foreground/5 to-transparent border-2 border-foreground/10 rounded-lg">
        <span className="text-sm font-semibold text-muted-foreground">
          アプリの種類:
        </span>
        <Button
          variant={isTypeModalOpen ? "default" : "outline"}
          size="sm"
          onClick={() => setIsTypeModalOpen(true)}
          className="text-xs"
        >
          種類: {typeLabel}
        </Button>
      </div>
      {isTypeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsTypeModalOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-[min(520px,92vw)] max-h-[80vh] overflow-auto rounded-xl bg-background p-6 shadow-2xl border border-foreground/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">アプリの種類</h3>
              <button
                type="button"
                onClick={() => setIsTypeModalOpen(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                閉じる
              </button>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-medium py-1">
                <input
                  type="radio"
                  name="type-filter"
                  value="all"
                  checked={typeFilter === "all"}
                  onChange={() => setTypeFilter("all")}
                  className="h-5 w-5"
                />
                全て
              </label>
              {typeOptions.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 text-sm font-medium py-1"
                >
                  <input
                    type="radio"
                    name="type-filter"
                    value={type}
                    checked={typeFilter === type}
                    onChange={() => setTypeFilter(type)}
                    className="h-5 w-5"
                  />
                  {type}
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
          {sortedApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedApps.map((app) => (
            <AppListRow key={app.id} app={app} />
          ))}
        </div>
      )}
    </>
  );
}
