"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppItem } from "../config/apps";
import Image from "next/image";

export default function AppCard({ app }: { app: AppItem }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = app.imageUrls ?? [];
  const activeImage = images[activeImageIndex];

  return (
    <a
      href={app.appUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
    >
      <Card className="relative overflow-hidden flex flex-col h-full p-2 bg-white border-2 border-foreground/10 rounded-lg shadow-sm hover:shadow-xl hover:border-foreground/30 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>

        {/* アプリ画像 */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-3">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={app.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground font-semibold">
              NO IMAGE
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2">
              <div
                className="absolute -inset-1"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              />
              <div className="relative z-10 flex items-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={`${app.id}-dot-${index}`}
                    type="button"
                    aria-label={`画像を${index + 1}枚目に切り替え`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setActiveImageIndex(index);
                    }}
                    className={`h-9 w-9 rounded-full border-2 border-white/90 transition-all ${
                      index === activeImageIndex
                        ? "bg-orange-400 shadow-[0_0_0_3px_rgba(255,255,255,0.7)]"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <CardHeader className="relative p-3 pb-2">
          <CardTitle className="text-lg font-bold text-foreground group-hover:text-cyan-600 transition-colors line-clamp-2">
            {app.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative flex-grow p-3 pt-0 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {app.description}
          </p>

          {/* 公開形態 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 text-foreground border border-orange-500/25">
              {app.deploymentType}
            </span>
          </div>

          {/* メタ情報 */}
          <div className="space-y-1 text-[11px] text-muted-foreground">
            <div>作成日：{app.createdAt}</div>
            <div>最終更新日：{app.updatedAt}</div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
