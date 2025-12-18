import { hc } from "hono/client";
import type { AppType } from "@my-portfolio/api";
import type { ClientResponse } from "hono/client";

// Cloudflare Service Binding の Fetcher 型定義
interface Fetcher {
  fetch: typeof fetch;
}

type Env = {
  API?: Fetcher;
  INTERNAL_API_KEY: string;
};

// 共通APIクライアントの作成
export function createApiClient(env: Env): ReturnType<typeof hc<AppType>> {
  // ローカル開発環境の判定
  const isDevelopment = !env.API;
  const baseUrl = isDevelopment ? "http://localhost:8787" : "http://dummy";

  const client = hc<AppType>(baseUrl, {
    fetch: isDevelopment ? undefined : env.API!.fetch.bind(env.API),
    headers: {
      "X-Internal-API-Key": env.INTERNAL_API_KEY,
    },
  });

  return client;
}

// Server Component用のヘルパー
export function getApiEnv(): Env {
  return {
    API: process.env.API as unknown as Fetcher | undefined,
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY || '',
  };
}
