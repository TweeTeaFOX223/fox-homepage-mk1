import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import ServiceLinks from "./ServiceLinks";

export default function BaseProfile() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center justify-center">
        「ツイーティ・ザ・フォックス」のプロフィール
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="flex items-center justify-center p-6 aspect-square ">
          {/* アイコンのサイズ */}
          <Avatar className="w-72 h-72">
            <AvatarImage src="/icon/my-icon.png" alt="t2fox-icon" />
            <AvatarFallback>t2fox-icon</AvatarFallback>
          </Avatar>
        </Card>

        <Card className="p-6 md:col-span-1 lg:col-span-2 ">
          <CardContent className="p-0 flex flex-col h-full justify-center">
            <div className="mb-4">
              <h2 className="text-xl font-bold">
                名前：ツイーティ・ザ・フォックス
              </h2>
              <p className="text-muted-foreground">略称：T2フォックス・TTF</p>
            </div>
            <div className="">
              <p>2023年頃から開発の活動を始めました。</p>
              <p>フロントエンドからバックエンドまで幅広く学習中です。</p>
              <p className="mt-4">
                趣味：マインクラフト・ネットに記事を投稿すること。
              </p>
              <p>自然言語処理によるSNSやBBSの分析をﾁｮｯﾄやってます。</p>
              <p className="mt-4">
                下部に制作物一覧があるので、ゆっくり見ていってください♨
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 col-span-1">
          <CardContent className="p-0">
            <div className="mt-4 flex items-center">
              <span>自己紹介リンク追加予定</span>
              <ExternalLink className="w-4 h-4 ml-1" />
              <span></span>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 col-span-1">
          <CardContent className="p-0">
            <div className="mt-4 flex items-center">
              <span>制作物の振り返り追加予定</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </div>
          </CardContent>
        </Card>

        {/* 外部サービスを出す部分 */}
        <Card className=" p-6 col-span-1 md:col-span-2 lg:col-span-1">
          <CardContent className="p-0">
            <ServiceLinks />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
