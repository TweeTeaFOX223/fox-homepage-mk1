//年月日表示の関数
// Next.jsでtoLocaleDateString()を使うと
// サーバーとクライアントとタイムゾーン不一致でハイドレーションエラーになるので使う
export function formatDateJP(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}/${month}/${day}`; // 2025/02/22 形式
}
