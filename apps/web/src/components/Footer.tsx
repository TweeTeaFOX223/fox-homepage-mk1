export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t p-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          © {currentYear} ツイーティ・ザ・フォックス. All rights reserved.
        </p>
        <div className="flex items-center">
          <span className="text-sm font-medium text-muted-foreground">
            made by ツイーティ・ザ・フォックス
          </span>
          <span className="inline-block ml-2 text-orange-500">🦊</span>
        </div>
      </div>
    </footer>
  );
}
