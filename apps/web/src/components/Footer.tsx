export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(251,146,60,0.18),transparent_45%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 sm:flex-1">
            <div className="text-lg font-black tracking-wide text-emerald-900">
              T2-FOX / TweeTea The Fox
            </div>
            <p className="text-xs text-emerald-900/70">
              © {currentYear} T2フォックス / ツイーティ・ザ・フォックス. All
              rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end sm:justify-end sm:ml-6">
            <a
              href="https://github.com/TweeTeaFOX223/fox-homepage-mk1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-emerald-900 shadow-[0_4px_0_rgba(16,185,129,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white lg:px-4 lg:py-2 lg:text-sm"
            >
              このサイトのGitHubのリポジトリ
              <span className="hidden lg:inline text-[10px] font-semibold text-emerald-900/70">
                github.com/TweeTeaFOX223/fox-homepage-mk1
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
