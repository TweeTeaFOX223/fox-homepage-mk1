export interface AppItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  detailPath: string;
  tags: string[];
  status: "運用中" | "開発中" | "停止中";
  createdAt: string;
  updatedAt: string;
}

export const apps: AppItem[] = [
  {
    id: "app-1",
    name: "サンプルアプリ1",
    description: "これはサンプルアプリの説明文です。",
    imageUrl: "/apps/app1.png",
    detailPath: "/apps/app-1",
    tags: ["TypeScript", "React", "Cloudflare"],
    status: "運用中",
    createdAt: "2024-01-01",
    updatedAt: "2024-03-01",
  },
  // 他のアプリをここに追加
];
