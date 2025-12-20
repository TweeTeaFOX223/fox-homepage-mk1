import appsData from "./apps.json";

export type DeploymentType =
  | "ウェブアプリ(すぐに使用可能！)"
  | "デスクトップアプリ(PCにインストール)"
  | "コンソールアプリ(ターミナルで実行)"
  | "その他(データや情報集など)";

export interface AppItem {
  id: string;
  name: string;
  description: string;
  appUrl: string;
  displayOrder: number;
  imageUrls: string[];
  deploymentType: DeploymentType;
  createdAt: string;
  updatedAt: string;
}

export const apps: AppItem[] = appsData as AppItem[];
