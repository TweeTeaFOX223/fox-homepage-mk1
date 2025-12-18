import { hc } from "hono/client";
import type { AppType } from "@my-portfolio/api";
import type { ClientResponse } from "hono/client";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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
  console.log('[createApiClient] Called with:', {
    hasInternalApiKey: !!env.INTERNAL_API_KEY,
    hasAPIBinding: !!env.API,
  });

  // ビルド時: INTERNAL_API_KEYが空の場合はダミークライアントを返す
  if (!env.INTERNAL_API_KEY) {
    console.log('[createApiClient] Build time: Returning dummy client');
    return hc<AppType>("http://localhost:8787", {
      headers: {
        "X-Internal-API-Key": "",
      },
    });
  }

  // ローカル開発環境の判定
  const isDevelopment = !env.API;
  const baseUrl = isDevelopment ? "http://localhost:8787" : "http://dummy";

  console.log('[createApiClient] Creating client:', {
    isDevelopment,
    baseUrl,
    hasCustomFetch: !isDevelopment,
  });

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
  console.log('[getApiEnv] Called, INTERNAL_API_KEY present:', !!process.env.INTERNAL_API_KEY);

  // ビルド時の判定
  if (!process.env.INTERNAL_API_KEY) {
    console.log('[getApiEnv] Build time detected, returning empty env');
    return {
      API: undefined,
      INTERNAL_API_KEY: '',
    };
  }

  try {
    // Cloudflare context からバインディングを取得
    const { env } = getCloudflareContext();
    // Service Bindingを型アサーションで取得
    const cloudflareEnv = env as any;
    console.log('[getApiEnv] Cloudflare context obtained, API binding present:', !!cloudflareEnv.API);
    return {
      API: cloudflareEnv.API as Fetcher | undefined,
      INTERNAL_API_KEY: process.env.INTERNAL_API_KEY || '',
    };
  } catch (error) {
    // ローカル開発環境の場合（getCloudflareContext が使えない）
    console.log('[getApiEnv] Development environment detected, using localhost. Error:', error);
    return {
      API: undefined,
      INTERNAL_API_KEY: process.env.INTERNAL_API_KEY || '',
    };
  }
}
