import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Twitter, Github } from "lucide-react";

export default function BaseProfile() {
  return (
    <div className="w-full sm:break-words md:break-normal">
      {/* 1枚のカードとしてまとめる */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/10 via-lime-500/10 to-teal-500/10 border-2 border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(252,211,77,0.14),transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(45,212,191,0.12),transparent_55%)]"></div>

        {/* ヘッダー */}
        <div className="relative p-6 pb-4">
          <h1 className="text-3xl md:text-4xl font-black text-center text-orange-500/95">
            プロフィール
          </h1>
          <p className="text-muted-foreground flex items-center justify-center mt-4">
            名刺的な簡易自己紹介です。
          </p>
        </div>

        {/* メイングリッド - 2カラム構造 */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 pt-0">
          {/* 左側カラム */}
          <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 content-start h-full">
              {/* アイコン - 2行2列 */}
              <div className="col-span-1 row-span-1 md:row-span-2 border-2 border-transparent rounded-lg p-2 bg-transparent flex items-center justify-center overflow-visible">
                <div className="relative w-40 h-40 md:w-44 md:h-44 xl:w-60 xl:h-60 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-full blur-2xl opacity-50"></div>
                  <Avatar className="relative w-full h-full border-4 border-amber-200/70 ring-2 ring-amber-400/50 shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow duration-300 hover:shadow-[0_0_96px_rgba(251,191,36,0.85)]">
                    <AvatarImage
                      src="/icon/my-icon.png"
                      alt="T2フォックスのアイコン"
                      className="object-cover"
                    />
                    <AvatarFallback className="avatar-fallback-fx bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100">
                      <span className="sr-only">T2</span>
                      <span className="avatar-fallback-blob avatar-fallback-blob--emerald -left-6 -top-6 h-20 w-20" />
                      <span className="avatar-fallback-blob avatar-fallback-blob--orange left-6 top-2 h-24 w-24" />
                      <span className="avatar-fallback-blob avatar-fallback-blob--emerald -right-8 bottom-0 h-20 w-20" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* 名前 */}
              <div className="col-span-1 row-span-1 md:row-span-2 border-2 border-emerald-500/30 rounded-lg p-3 lg:pl-8 xl:pl-10 2xl:pl-16 mb-2 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 flex flex-col gap-0 text-center lg:text-left">
                <p className="text-xs xl:text-base text-emerald-700 font-bold mb-0 leading-tight">
                  正式の名前：
                </p>
                <p className="text-[10px] xl:text-sm font-bold text-foreground mt-0 leading-tight">
                  ツイーティ・ザ・フォックス
                </p>
                <p className="text-xs xl:text-base text-teal-700 font-bold mt-1 mb-0 leading-tight">
                  略式の名前：
                </p>
                <p className="text-xs xl:text-base font-bold text-foreground mt-0 leading-tight">
                  T2フォックス／T2-FOX
                </p>
                <p className="text-xs xl:text-base text-teal-700 font-bold mt-3 mb-0 leading-tight">
                  ホームページ：
                </p>
                <p className="text-[10px] xl:text-sm font-bold text-foreground mt-0 leading-tight">
                  home.t2fox.workers.dev
                </p>
                <p className="text-xs xl:text-base text-teal-700 font-bold mt-3 mb-0 leading-tight">
                  開発で重視すること：
                </p>
                <div className="text-xs xl:text-base font-bold text-foreground mt-0 leading-tight">
                  <div>所属勢力 or 自分自身の</div>
                  <div> 「目標達成・任務完遂」</div>
                </div>
              </div>

              {/* 主な活動内容 - 1列 */}
              <div className="col-span-1 border-2 border-cyan-500/30 rounded-lg p-3 bg-gradient-to-r from-cyan-50/50 to-emerald-50/50 md:text-center lg:text-left">
                <p className="text-xs xl:text-base text-cyan-700 font-bold mb-2">
                  主な活動内容：
                </p>
                <p className="block md:hidden text-[11px] xl:text-sm text-foreground font-bold">
                  PC作業効率化ツール開発 / SNSや電子掲示板の文章分析 /
                  UnityかUEでゲーム開発(予定)
                </p>
                <ul className="space-y-1 text-[11px] xl:text-sm text-foreground font-bold hidden md:block">
                  <li className="flex items-start md:justify-center lg:justify-start text-foreground">
                    <span className="mr-1.5 md:hidden lg:inline">•</span>
                    <span>PC作業効率化ツール開発</span>
                  </li>
                  <li className="flex items-start md:justify-center lg:justify-start text-foreground">
                    <span className="mr-1.5 md:hidden lg:inline">•</span>
                    <span>SNSや電子掲示板の文章分析</span>
                  </li>
                  <li className="flex items-start md:justify-center lg:justify-start text-foreground">
                    <span className="mr-1.5 md:hidden lg:inline">•</span>
                    <span>UnityかUEでゲーム開発(予定)</span>
                  </li>
                </ul>
              </div>

              {/* 取り扱い可能な技術 - 1列 */}
              <div className="col-span-1 border-2 border-emerald-500/30 rounded-lg p-3 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 md:text-center lg:text-left">
                <p className="text-xs xl:text-base text-emerald-700 font-bold mb-2">
                  主な取り扱い技術：
                </p>
                <p className="block md:hidden text-[11px] xl:text-sm text-foreground font-bold break-all">
                  TypeScript・Python・C#(Unity)・Cloudflare(Workers・D1・R2)・GitHub
                  Actions(ビルド・デプロイ)
                </p>
                <div className="space-y-1 text-[11px] xl:text-sm text-foreground font-bold hidden md:block">
                  <p className="break-all">TypeScript・Python・C#(Unity)</p>
                  <p className="break-all">Cloudflare(Workers・D1・R2)</p>
                  <p className="break-all">GitHub Actions(ビルド/デプロイ)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右側カラム - SNSリンク */}
          <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/20 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-10 gap-[15px] lg:gap-[14px] xl:gap-[12px] content-start h-full">
              {/* X(Twitter) - 6列 */}
              <div className="col-span-1 md:col-span-6 border-2 border-[#1DA1F2]/30 rounded-lg bg-gradient-to-r from-[#1DA1F2]/5 to-[#1DA1F2]/10 hover:from-[#1DA1F2]/20 hover:to-[#1DA1F2]/30 hover:border-[#1DA1F2]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#1DA1F2]/20 hover:-translate-y-1 xl:min-h-[96px]">
                <a
                  href="https://x.com/TweeTeaFOX223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-full p-4"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-12 xl:h-12 rounded-full bg-[#000000] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <img
                        src="/social_logo/x_logo.svg"
                        alt="X"
                        className="w-4 h-4 md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 xl:w-7 xl:h-7"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs xl:text-base">
                        X:@TweeTeaFOX223
                      </div>
                      <div className="text-[10px] xl:text-sm text-muted-foreground">
                        開発関連の話題に超特化
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Twilog - 4列 */}
              <div className="col-span-1 md:col-span-4 border-2 border-[#00BFFF]/30 rounded-lg bg-gradient-to-r from-[#00BFFF]/5 to-[#00BFFF]/10 hover:from-[#00BFFF]/20 hover:to-[#00BFFF]/30 hover:border-[#00BFFF]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#00BFFF]/20 hover:-translate-y-1 xl:min-h-[96px]">
                <a
                  href="https://twilog.togetter.com/TweeTeaFOX223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-start justify-center h-full p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-12 xl:h-12 rounded-full bg-[#00BFFF] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Twitter className="w-4 h-4 md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 xl:w-7 xl:h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs xl:text-base">
                        Twilog
                      </div>
                      <div className="text-[10px] xl:text-sm text-muted-foreground mt-1">
                        Xログ検索
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* GitHub */}
              <div className="col-span-1 md:col-span-10 border-2 border-[#333333]/30 rounded-lg bg-gradient-to-r from-[#333333]/5 to-[#333333]/10 hover:from-[#333333]/20 hover:to-[#333333]/30 hover:border-[#333333]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#333333]/20 hover:-translate-y-1 xl:min-h-[96px]">
                <a
                  href="https://github.com/TweeTeaFOX223"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-full p-4"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-12 xl:h-12 rounded-full bg-[#333333] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Github className="w-4 h-4 md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 xl:w-7 xl:h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs xl:text-base">
                        GitHub：@TweeTeaFOX223
                      </div>
                      <div className="text-[10px] xl:text-sm text-muted-foreground">
                        作業場。アプリの公開先/配布先。READMEに説明書完備
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Discord */}
              <div className="col-span-1 md:col-span-10 border-2 border-[#5865F2]/30 rounded-lg bg-gradient-to-r from-[#5865F2]/5 to-[#5865F2]/10 hover:from-[#5865F2]/20 hover:to-[#5865F2]/30 hover:border-[#5865F2]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#5865F2]/20 hover:-translate-y-1 xl:min-h-[96px]">
                <a
                  href="http://discordapp.com/users/1106287236456136797"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-full p-4"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-12 xl:h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <img
                        src="/social_logo/Discord-Symbol-White.svg"
                        alt="Discord"
                        className="w-4 h-4 md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 xl:w-7 xl:h-7"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs xl:text-base">
                        Discord：@tweetea_the_fox
                      </div>
                      <div className="text-[9px] xl:text-xs text-muted-foreground">
                        主要な連絡手段。開発関係のチーム作業の主力ツール
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* note/Zenn/Qiita/Gist - 4個セット */}
              <div className="col-span-1 md:col-span-10 grid grid-cols-2 md:grid-cols-4 gap-2 xl:gap-3">
                {/* note */}
                <div className="border-2 border-[#41C9B4]/30 rounded-lg bg-gradient-to-r from-[#41C9B4]/5 to-[#41C9B4]/10 hover:from-[#41C9B4]/20 hover:to-[#41C9B4]/30 hover:border-[#41C9B4]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#41C9B4]/20 hover:-translate-y-1 xl:min-h-[88px]">
                  <a
                    href="https://note.com/tweeteafox300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full py-3 px-2"
                  >
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-xs xl:text-base">
                          note
                        </div>
                      </div>
                      <div className="text-[9px] xl:text-xs font-bold  text-foreground">
                        @tweeteafox300
                      </div>
                    </div>
                  </a>
                </div>

                {/* Zenn */}
                <div className="border-2 border-[#3EA8FF]/30 rounded-lg bg-gradient-to-r from-[#3EA8FF]/5 to-[#3EA8FF]/10 hover:from-[#3EA8FF]/20 hover:to-[#3EA8FF]/30 hover:border-[#3EA8FF]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#3EA8FF]/20 hover:-translate-y-1 xl:min-h-[88px]">
                  <a
                    href="https://zenn.dev/tweeteafox300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full py-3 px-2"
                  >
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-xs xl:text-base">
                          Zenn
                        </div>
                      </div>
                      <div className="text-[9px] xl:text-xs font-bold  text-foreground">
                        @tweeteafox300
                      </div>
                    </div>
                  </a>
                </div>

                {/* Qiita */}
                <div className="border-2 border-[#55C500]/30 rounded-lg bg-gradient-to-r from-[#55C500]/5 to-[#55C500]/10 hover:from-[#55C500]/20 hover:to-[#55C500]/30 hover:border-[#55C500]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#55C500]/20 hover:-translate-y-1 xl:min-h-[88px]">
                  <a
                    href="https://qiita.com/tweeteafox300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full py-3 px-2"
                  >
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-xs xl:text-base">
                          Qiita
                        </div>
                      </div>
                      <div className="text-[9px] xl:text-xs font-bold  text-foreground">
                        @tweeteafox300
                      </div>
                    </div>
                  </a>
                </div>

                {/* Gist */}
                <div className="border-2 border-[#6e5494]/30 rounded-lg bg-gradient-to-r from-[#6e5494]/5 to-[#6e5494]/10 hover:from-[#6e5494]/20 hover:to-[#6e5494]/30 hover:border-[#6e5494]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#6e5494]/20 hover:-translate-y-1 xl:min-h-[88px]">
                  <a
                    href="https://gist.github.com/TweeTeaFOX223"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full py-3 px-2"
                  >
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-xs xl:text-base">
                          Gist
                        </div>
                      </div>
                      <div className="text-[9px] xl:text-xs font-bold  text-foreground">
                        @TweeTeaFOX223
                      </div>
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
