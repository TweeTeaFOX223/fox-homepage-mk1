import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Twitter,
  BookOpen,
  Github,
  FileText,
  MessageCircle,
} from "lucide-react";

export default function BaseProfile() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* 1枚のカードとしてまとめる */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-2 border-emerald-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]"></div>

        {/* ヘッダー */}
        <div className="relative p-6 pb-4">
          <h1 className="text-3xl md:text-4xl font-black text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            プロフィール
          </h1>
        </div>

        {/* メイングリッド - 2カラム構造 */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 pt-0">
          {/* 左側カラム */}
          <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="relative grid grid-cols-2 gap-3 content-start h-full">
              {/* アイコン - 2行2列 */}
              <div className="col-span-1 row-span-2 border-2 border-emerald-500/30 rounded-lg p-4 bg-white flex items-center justify-center">
                <div className="relative w-36 h-36">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-full blur-xl opacity-30"></div>
                  <Avatar className="relative w-full h-full border-4 border-white shadow-xl">
                    <AvatarImage
                      src="/icon/my-icon.png"
                      alt="T2フォックスのアイコン"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-100 to-teal-100">
                      T2
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* 名前 */}
              <div className="col-span-1 border-2 border-emerald-500/30 rounded-lg p-3 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                <p className="text-xs text-emerald-700 font-bold mb-1">
                  略式の名前：
                </p>
                <p className="text-sm font-bold text-foreground">
                  T2フォックス
                </p>
              </div>

              {/* 個人開発活動の開始年 */}
              <div className="col-span-1 border-2 border-teal-500/30 rounded-lg p-3 bg-gradient-to-r from-teal-50/50 to-cyan-50/50">
                <p className="text-xs text-teal-700 font-bold mb-1">
                  正式の名前：
                </p>
                <p className="text-xs font-bold text-foreground">
                  ツイーティ・ザ・フォックス
                </p>
              </div>

              {/* 主な活動内容 - 1列 */}
              <div className="col-span-1 border-2 border-cyan-500/30 rounded-lg p-3 bg-gradient-to-r from-cyan-50/50 to-emerald-50/50">
                <p className="text-xs text-cyan-700 font-bold mb-2">
                  主な活動内容：
                </p>
                <ul className="space-y-1 text-[11px] text-foreground  font-bold">
                  <li className="flex items-start  text-foreground">
                    <span className="mr-1.5">•</span>
                    <span>PC作業効率化ツール開発</span>
                  </li>
                  <li className="flex items-start  text-foreground">
                    <span className="mr-1.5">•</span>
                    <span>SNSや電子掲示板の文章分析</span>
                  </li>
                  <li className="flex items-start text-foreground">
                    <span className="mr-1.5">•</span>
                    <span>UnityかUEでゲーム開発(予定)</span>
                  </li>
                </ul>
              </div>

              {/* 取り扱い可能な技術 - 1列 */}
              <div className="col-span-1 border-2 border-emerald-500/30 rounded-lg p-3 bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                <p className="text-xs text-emerald-700 font-bold mb-2">
                  主な取り扱い技術：
                </p>
                <div className="space-y-1 text-[11px] text-foreground  font-bold">
                  <p>TypeScript・Python・C#(Unity)</p>
                  <p>Cloudflare(Workers・D1・R2)</p>
                  <p>GitHub Actions(ビルド・デプロイ)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右側カラム - SNSリンク */}
          <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/20 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="relative grid grid-cols-10 gap-3 content-start h-full">
              {/* X(Twitter) - 6列 */}
              <div className="col-span-6 border-2 border-[#1DA1F2]/30 rounded-lg bg-gradient-to-r from-[#1DA1F2]/5 to-[#1DA1F2]/10 hover:from-[#1DA1F2]/20 hover:to-[#1DA1F2]/30 hover:border-[#1DA1F2]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#1DA1F2]/20 hover:-translate-y-1">
                <a
                  href="https://x.com/TweeTeaFOX223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-full p-4"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-7 h-7 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Twitter className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs">X：@TweeTeaFOX223</div>
                      <div className="text-[10px] text-muted-foreground">
                        開発関連の話題だけ扱う・高浮上
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Twilog - 4列 */}
              <div className="col-span-4 border-2 border-[#00BFFF]/30 rounded-lg bg-gradient-to-r from-[#00BFFF]/5 to-[#00BFFF]/10 hover:from-[#00BFFF]/20 hover:to-[#00BFFF]/30 hover:border-[#00BFFF]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#00BFFF]/20 hover:-translate-y-1">
                <a
                  href="https://twilog.togetter.com/TweeTeaFOX223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center h-full p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#00BFFF] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs">Twilog</div>
                      <div className="text-[10px] text-muted-foreground mt-1">
                        ログ保存
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* GitHub */}
              <div className="col-span-10 border-2 border-[#333333]/30 rounded-lg bg-gradient-to-r from-[#333333]/5 to-[#333333]/10 hover:from-[#333333]/20 hover:to-[#333333]/30 hover:border-[#333333]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#333333]/20 hover:-translate-y-1">
                <a
                  href="https://github.com/TweeTeaFOX223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-full p-4"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-7 h-7 rounded-full bg-[#333333] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs">
                        GitHub：@TweeTeaFOX223
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        アプリの公開先/配布先。説明書完備
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Discord */}
              <div className="col-span-10 border-2 border-[#5865F2]/30 rounded-lg bg-gradient-to-r from-[#5865F2]/5 to-[#5865F2]/10 hover:from-[#5865F2]/20 hover:to-[#5865F2]/30 hover:border-[#5865F2]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#5865F2]/20 hover:-translate-y-1">
                <a
                  href="http://discordapp.com/users/1106287236456136797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-full p-4"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-7 h-7 rounded-full bg-[#5865F2] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs">
                        Discord：@tweetea_the_fox
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        開発関係のチーム作業/連絡に使用
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* note/Zenn/Qiita/Gist - 4個セット */}
              <div className="col-span-10 grid grid-cols-4 gap-2">
                {/* note */}
                <div className="border-2 border-[#41C9B4]/30 rounded-lg bg-gradient-to-r from-[#41C9B4]/5 to-[#41C9B4]/10 hover:from-[#41C9B4]/20 hover:to-[#41C9B4]/30 hover:border-[#41C9B4]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#41C9B4]/20 hover:-translate-y-1">
                  <a
                    href="https://note.com/tweeteafox300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full py-4 px-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#41C9B4] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                        <FileText className="w-3 h-3" />
                      </div>
                      <div className="font-bold text-xs">note</div>
                    </div>
                  </a>
                </div>

                {/* Zenn */}
                <div className="border-2 border-[#3EA8FF]/30 rounded-lg bg-gradient-to-r from-[#3EA8FF]/5 to-[#3EA8FF]/10 hover:from-[#3EA8FF]/20 hover:to-[#3EA8FF]/30 hover:border-[#3EA8FF]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#3EA8FF]/20 hover:-translate-y-1">
                  <a
                    href="https://zenn.dev/tweeteafox300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full py-4 px-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#3EA8FF] flex items-center justify-center text-white shadow-lg font-bold text-[10px] flex-shrink-0">
                        Z
                      </div>
                      <div className="font-bold text-xs">Zenn</div>
                    </div>
                  </a>
                </div>

                {/* Qiita */}
                <div className="border-2 border-[#55C500]/30 rounded-lg bg-gradient-to-r from-[#55C500]/5 to-[#55C500]/10 hover:from-[#55C500]/20 hover:to-[#55C500]/30 hover:border-[#55C500]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#55C500]/20 hover:-translate-y-1">
                  <a
                    href="https://qiita.com/tweeteafox300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full py-4 px-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#55C500] flex items-center justify-center text-white shadow-lg font-bold text-[10px] flex-shrink-0">
                        Q
                      </div>
                      <div className="font-bold text-xs">Qiita</div>
                    </div>
                  </a>
                </div>

                {/* Gist */}
                <div className="border-2 border-[#6e5494]/30 rounded-lg bg-gradient-to-r from-[#6e5494]/5 to-[#6e5494]/10 hover:from-[#6e5494]/20 hover:to-[#6e5494]/30 hover:border-[#6e5494]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#6e5494]/20 hover:-translate-y-1">
                  <a
                    href="https://gist.github.com/TweeTeaFOX223"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full py-4 px-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#6e5494] flex items-center justify-center text-white shadow-lg font-bold text-[10px] flex-shrink-0">
                        G
                      </div>
                      <div className="font-bold text-xs">Gist</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
