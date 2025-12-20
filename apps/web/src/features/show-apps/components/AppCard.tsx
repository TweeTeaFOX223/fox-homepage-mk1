"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppItem } from "../config/apps";
import Image from "next/image";

export default function AppCard({ app }: { app: AppItem }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = app.imageUrls ?? [];
  const activeImage = images[activeImageIndex];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="block h-full text-left group"
        aria-label={`${app.name}の詳細を開く`}
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
              className="object-contain transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground font-semibold">
              NO IMAGE
            </div>
          )}
        </div>

        <CardHeader className="relative p-3 pb-2">
          <CardTitle className="text-lg font-bold text-foreground group-hover:text-cyan-600 transition-colors line-clamp-2">
            {app.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative flex-grow p-3 pt-0 space-y-3">
          <p
            className="text-sm text-muted-foreground line-clamp-3 cursor-help"
            title={app.description}
          >
            {app.description}
          </p>

          {/* 公開形態 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 text-foreground border border-orange-500/25">
              {app.deploymentType}
            </span>
          </div>

          {/* 使用技術 */}
          {app.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {app.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-semibold rounded-md bg-foreground/5 text-foreground border border-foreground/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-[min(960px,92vw)] max-h-[90vh] overflow-auto rounded-2xl bg-background p-6 shadow-2xl border border-foreground/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">{app.name}</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border-2 border-orange-500 bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-600 shadow-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
              >
                閉じる
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group">
                  {activeImage ? (
                    <Image
                      src={activeImage}
                      alt={app.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground font-semibold">
                      NO IMAGE
                    </div>
                  )}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="前の画像へ"
                        onClick={() =>
                          setActiveImageIndex(
                            (activeImageIndex - 1 + images.length) % images.length
                          )
                        }
                        className="absolute inset-y-0 left-0 w-1/2"
                      />
                      <button
                        type="button"
                        aria-label="次の画像へ"
                        onClick={() =>
                          setActiveImageIndex(
                            (activeImageIndex + 1) % images.length
                          )
                        }
                        className="absolute inset-y-0 right-0 w-1/2"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent" />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-white/90">
                          前へ
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-black/10 to-transparent" />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-white/90">
                          次へ
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="text-xs text-muted-foreground">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{app.description}</p>
                {app.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {app.tags.map((tag) => (
                      <span
                        key={`${app.id}-${tag}`}
                        className="px-3 py-1 text-xs font-semibold rounded-md bg-foreground/5 text-foreground border border-foreground/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <a
                  href={app.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center justify-center w-full rounded-xl bg-orange-500 px-5 py-4 text-sm font-bold text-white shadow-md hover:bg-orange-600 transition-colors"
                >
                  <span className="text-base">
                    アプリ配布先&説明書のサイトを開く
                  </span>
                  <span className="text-xs font-semibold text-white/90 break-all">
                    {app.appUrl}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
