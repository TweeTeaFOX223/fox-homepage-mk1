# BFF構成への移行 - Claude Code実装要件

## 🎯 プロジェクト概要

既存のNext.jsポートフォリオサイトを、セキュアなBFF (Backend for Frontend) パターンに移行する。

**デプロイ先**: Cloudflare Workers (両Worker)

**移行目的**:
- 機密情報（APIキー、トークン）をBFF層から完全分離
- BFFを「信頼できない領域」として扱い、Backend層で機密処理を実行
- セキュリティインシデント時の影響範囲を最小化

**重要な原則**:
> "Next.jsはBFFでありレンダリングサーバ。バックエンドと癒着させない"
> "BFFが侵害されても、内部DBや他サービスへの横展開を防ぐ"

---

## 📁 現在のプロジェクト構造

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # UI components (shadcn/ui)
│   ├── features/               # Feature-based modules
│   │   ├── base-profile/
│   │   ├── interested-technology/
│   │   ├── navigation-bar/
│   │   ├── show-article-list/
│   │   │   └── api/
│   │   │       ├── get-qiita-articles.ts    # 🔄 Backend層へ移行
│   │   │       └── get-zenn-articles.ts     # 🔄 Backend層へ移行
│   │   ├── show-github-repository/
│   │   │   └── api/
│   │   │       └── github.ts                # 🔄 Backend層へ移行
│   │   └── show-poem-list/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── wrangler.jsonc              # Cloudflare Workers設定
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🏗️ 目標アーキテクチャ

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────────────────────┐
│  Next.js Worker (BFF層)             │
│  - SSR/レンダリング                  │
│  - 公開API呼び出し                   │
│  - 環境変数: 公開情報のみ            │
└──────┬──────────────────────────────┘
       │ Service Binding (内部通信)
       │ ⚡ 追加課金なし
       │ 🔒 インターネット非経由
       ▼
┌─────────────────────────────────────┐
│  Hono.js Worker (Backend層)         │
│  - 機密API呼び出し (GitHub token)    │
│  - DB操作                            │
│  - 環境変数: 機密情報                │
│  - 🚫 外部インターネットから到達不可 │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  外部サービス                        │
│  - GitHub API (with token)          │
│  - Database (D1, etc.)              │
└─────────────────────────────────────┘
```

---

## 📂 目標ディレクトリ構造（Monorepo）

```
project-root/
├── apps/
│   ├── web/                           # Next.js (BFF層)
│   │   ├── src/
│   │   │   ├── app/                   # 既存のappディレクトリ
│   │   │   ├── components/            # 既存のcomponents
│   │   │   ├── features/              # 既存のfeatures
│   │   │   │   ├── show-article-list/
│   │   │   │   │   └── api/
│   │   │   │   │       └── articles.ts      # 🔄 Backend呼び出しに統合
│   │   │   │   └── show-github-repository/
│   │   │   │       └── api/
│   │   │   │           └── github.ts        # 🔄 Backend呼び出しに変更
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   │   └── api-client.ts     # 🆕 共通APIクライアント
│   │   │   └── types/
│   │   ├── wrangler.toml              # Service Binding設定
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── tsconfig.json
│   │
│   └── api/                           # Hono.js (Backend層) 🆕
│       ├── src/
│       │   ├── index.ts               # メインエントリーポイント
│       │   ├── routes/
│       │   │   ├── github.ts          # GitHub API呼び出し
│       │   │   ├── qiita.ts           # Qiita API呼び出し 🆕
│       │   │   ├── zenn.ts            # Zenn API呼び出し 🆕
│       │   │   └── articles.ts        # 統合記事エンドポイント 🆕
│       │   ├── services/              # ビジネスロジック 🆕
│       │   │   ├── qiita-service.ts
│       │   │   ├── zenn-service.ts
│       │   │   └── github-service.ts
│       │   └── middleware/
│       │       └── auth.ts            # 内部API認証
│       ├── wrangler.toml              # Backend Worker設定
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/                        # 共有型定義 🆕
│       ├── src/
│       │   └── types/
│       │       ├── github.ts          # GitHubリポジトリ型
│       │       ├── qiita.ts           # Qiita記事型 🆕
│       │       ├── zenn.ts            # Zenn記事型 🆕
│       │       ├── article.ts         # 統合記事型 🆕
│       │       └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                       # Root package.json
├── pnpm-workspace.yaml               # pnpm workspaces
└── turbo.json                        # Turborepo設定
```

---

## 🔧 技術スタック

### BFF層 (apps/web)
- **Framework**: Next.js (App Router)
- **Runtime**: Cloudflare Workers
- **Adapter**: @opennextjs/cloudflare
- **UI**: React + Tailwind CSS + shadcn/ui (既存維持)
- **RPC Client**: Hono Client (`hc` from `hono/client`)

### Backend層 (apps/api)
- **Framework**: Hono.js
- **Runtime**: Cloudflare Workers
- **Validation**: Zod + @hono/zod-validator
- **Type Export**: Hono RPC (AppType)

### 共有パッケージ (packages/shared)
- **Validation**: Zod
- **Types**: TypeScript

### Monorepo
- **Tool**: Turborepo
- **Package Manager**: pnpm
- **Build**: Wrangler CLI

---

## 📋 実装タスク（Phase別）

### Phase 1: Monorepo構造の作成 ⭐ 最優先

**目標**: ディレクトリ構造のみ変更、既存コードは動作保証

#### タスク一覧

1. **Root設定ファイルの作成**
   - [ ] `package.json` (root)
   - [ ] `pnpm-workspace.yaml`
   - [ ] `turbo.json`

2. **既存Next.jsプロジェクトの移動**
   - [ ] `apps/web/` ディレクトリ作成
   - [ ] 既存ファイルを `apps/web/` へ移動
   - [ ] `apps/web/wrangler.toml` 作成 (`.jsonc` → `.toml`に変換)
   - [ ] パッケージ名を `@my-portfolio/web` に変更

3. **共有パッケージの作成**
   - [ ] `packages/shared/` ディレクトリ作成
   - [ ] `packages/shared/package.json` 作成
   - [ ] `packages/shared/tsconfig.json` 作成
   - [ ] 空の型定義ファイル作成

4. **ビルドとデプロイの確認**
   - [ ] `pnpm install` 実行
   - [ ] `turbo build --filter=@my-portfolio/web` 実行
   - [ ] `turbo dev --filter=@my-portfolio/web` 実行
   - [ ] 既存機能が動作することを確認

#### 重要な設定ファイル

**Root package.json:**
```json
{
  "name": "portfolio-monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "deploy": "turbo deploy",
    "lint": "turbo lint",
    "type-check": "turbo type-check"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  },
  "packageManager": "pnpm@9.0.0",
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

**pnpm-workspace.yaml:**
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**turbo.json:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "deploy": {
      "dependsOn": ["build"],
      "cache": false
    },
    "lint": {},
    "type-check": {}
  }
}
```

**apps/web/wrangler.toml:**
```toml
name = "portfolio-web"
compatibility_date = "2024-12-01"
compatibility_flags = ["nodejs_compat"]

# Next.jsのビルド出力を指定
# 注: open-next.config.tsの設定に依存
```

---

### Phase 2: Backend Worker作成

**目標**: Hono.js Backendの基礎を構築し、Service Bindingを設定

#### タスク一覧

1. **Backend Workerのセットアップ**
   - [ ] `apps/api/` ディレクトリ作成
   - [ ] `apps/api/package.json` 作成
   - [ ] `apps/api/tsconfig.json` 作成
   - [ ] `apps/api/wrangler.toml` 作成
   - [ ] 必要なパッケージをインストール

2. **基本的なHonoアプリ実装**
   - [ ] `apps/api/src/index.ts` 作成
   - [ ] ヘルスチェックエンドポイント実装
   - [ ] 内部認証ミドルウェア実装
   - [ ] AppTypeのエクスポート

3. **Service Binding設定**
   - [ ] BFF層の `wrangler.toml` にService Binding追加
   - [ ] Backend層のビルド確認
   - [ ] ローカル開発での接続確認

4. **開発環境の整備**
   - [ ] `.dev.vars` ファイル作成（両Worker）
   - [ ] 同時起動スクリプト作成

#### 必要なファイル

**apps/api/package.json:**
```json
{
  "name": "@my-portfolio/api",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "build": "tsc && wrangler deploy --dry-run",
    "deploy": "wrangler deploy",
    "lint": "eslint src",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "hono": "^4.0.0",
    "@hono/zod-validator": "^0.2.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.0.0",
    "typescript": "^5.3.0",
    "wrangler": "^3.0.0"
  }
}
```

**apps/api/wrangler.toml:**
```toml
name = "portfolio-api"
main = "src/index.ts"
compatibility_date = "2024-12-01"

# routesを設定しない = 外部から到達不可

# 開発用の環境変数（実際の値は.dev.varsに記載）
[vars]
NODE_ENV = "development"

# 本番用の環境変数はCloudflareダッシュボードで設定
# GITHUB_TOKEN (Secret)
# INTERNAL_API_KEY (Secret)
```

**apps/api/src/index.ts:**
```typescript
import { Hono } from 'hono';

type Bindings = {
  GITHUB_TOKEN: string;
  INTERNAL_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// 内部認証ミドルウェア
app.use('*', async (c, next) => {
  const apiKey = c.req.header('X-Internal-API-Key');
  if (apiKey !== c.env.INTERNAL_API_KEY) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  await next();
});

// ヘルスチェック
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: Date.now() });
});

// 型エクスポート（Hono RPC用）
export type AppType = typeof app;

export default app;
```

**apps/api/.dev.vars:**
```
GITHUB_TOKEN=ghp_your_github_token_here
INTERNAL_API_KEY=your-random-internal-key-here
```

**apps/web/wrangler.toml（Service Binding追加）:**
```toml
name = "portfolio-web"
compatibility_date = "2024-12-01"
compatibility_flags = ["nodejs_compat"]

# Backend WorkerへのService Binding
[[services]]
binding = "API"
service = "portfolio-api"

[vars]
NODE_ENV = "production"
```

**apps/web/.dev.vars:**
```
INTERNAL_API_KEY=your-random-internal-key-here
```

---

### Phase 3: 共有型定義の抽出

**目標**: 既存の型定義を共有パッケージに移行

#### タスク一覧

1. **型定義の移行**
   - [ ] `packages/shared/src/types/github.ts` 作成
   - [ ] `packages/shared/src/types/article.ts` 作成
   - [ ] Zodスキーマと型定義を記述
   - [ ] `packages/shared/src/types/index.ts` でエクスポート

2. **インポートパスの更新**
   - [ ] `apps/web/tsconfig.json` に paths 設定追加
   - [ ] 既存コードのインポート文を更新
   - [ ] 型チェック確認

3. **ビルド確認**
   - [ ] `turbo type-check` 実行
   - [ ] `turbo build` 実行

#### ファイル例

**packages/shared/package.json:**
```json
{
  "name": "@my-portfolio/shared",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/types/index.ts",
  "types": "./src/types/index.ts",
  "exports": {
    "./types/*": "./src/types/*.ts"
  },
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

**packages/shared/src/types/github.ts:**
```typescript
import { z } from 'zod';

export const GitHubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string(),
  topics: z.array(z.string()).optional(),
});

export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>;

export const GitHubRepositoryListSchema = z.array(GitHubRepositorySchema);
```

**packages/shared/src/types/index.ts:**
```typescript
export * from './github';
export * from './article';
```

**apps/web/tsconfig.json（paths追加）:**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@my-portfolio/shared/*": ["../../packages/shared/src/*"]
    }
  }
}
```

---

### Phase 4: 全外部API呼び出しの移行 ⚠️ 重要

**目標**: Qiita、Zenn、GitHub全ての外部API呼び出しをBackend層に統一

**設計方針**:
- 全ての外部API呼び出しをBackend層に集約
- BFF層はBackend層のみと通信（一貫性のある設計）
- 将来的なキャッシュやレート制限管理を容易に
- エラーハンドリングとロギングを一元化

#### タスク一覧

1. **共有型定義の作成**
   - [ ] `packages/shared/src/types/qiita.ts` 作成
   - [ ] `packages/shared/src/types/zenn.ts` 作成
   - [ ] `packages/shared/src/types/article.ts` 作成（統合型）
   - [ ] Zodスキーマと型定義を記述

2. **Backend層のAPI実装**
   - [ ] `apps/api/src/services/qiita-service.ts` 作成
   - [ ] `apps/api/src/services/zenn-service.ts` 作成
   - [ ] `apps/api/src/services/github-service.ts` 作成
   - [ ] `apps/api/src/routes/qiita.ts` 作成
   - [ ] `apps/api/src/routes/zenn.ts` 作成
   - [ ] `apps/api/src/routes/github.ts` 作成
   - [ ] `apps/api/src/routes/articles.ts` 作成（統合エンドポイント）
   - [ ] エラーハンドリング実装
   - [ ] ロギング実装

3. **BFF層の呼び出しコード更新**
   - [ ] `apps/web/src/lib/api-client.ts` 作成（共通クライアント）
   - [ ] `apps/web/src/features/show-article-list/api/articles.ts` 更新
   - [ ] `apps/web/src/features/show-github-repository/api/github.ts` 更新
   - [ ] 既存コンポーネントの動作確認

4. **テストとデプロイ**
   - [ ] ローカル開発環境で全API動作確認
   - [ ] Backend Workerデプロイ
   - [ ] BFF Workerデプロイ
   - [ ] 本番環境で動作確認

#### 共有型定義

**packages/shared/src/types/qiita.ts:**
```typescript
import { z } from 'zod';

export const QiitaArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  created_at: z.string(),
  likes_count: z.number(),
  tags: z.array(
    z.object({
      name: z.string(),
    })
  ),
  user: z.object({
    id: z.string(),
    profile_image_url: z.string().url(),
  }),
});

export type QiitaArticle = z.infer<typeof QiitaArticleSchema>;

export const QiitaArticleListSchema = z.array(QiitaArticleSchema);
```

**packages/shared/src/types/zenn.ts:**
```typescript
import { z } from 'zod';

export const ZennArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  published_at: z.string(),
  path: z.string(),
  liked_count: z.number(),
  emoji: z.string(),
});

export type ZennArticle = z.infer<typeof ZennArticleSchema>;

export const ZennArticleListSchema = z.object({
  articles: z.array(ZennArticleSchema),
  next_page: z.number().nullable(),
});
```

**packages/shared/src/types/article.ts:**
```typescript
import { z } from 'zod';

// 統合記事型（Qiita/Zenn共通フォーマット）
export const UnifiedArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  publishedAt: z.string(),
  likes: z.number(),
  platform: z.enum(['qiita', 'zenn']),
  tags: z.array(z.string()).optional(),
  emoji: z.string().optional(), // Zennのみ
});

export type UnifiedArticle = z.infer<typeof UnifiedArticleSchema>;

export const UnifiedArticleListSchema = z.array(UnifiedArticleSchema);
```

**packages/shared/src/types/github.ts:**
```typescript
import { z } from 'zod';

export const GitHubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string(),
  topics: z.array(z.string()).optional(),
});

export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>;

export const GitHubRepositoryListSchema = z.array(GitHubRepositorySchema);
```

#### Backend層の実装

**apps/api/src/services/qiita-service.ts:**
```typescript
import { QiitaArticleListSchema, type QiitaArticle } from '@my-portfolio/shared/types/qiita';

export class QiitaService {
  private readonly baseURL = 'https://qiita.com/api/v2';

  async getUserArticles(username: string, perPage: number = 20): Promise<QiitaArticle[]> {
    try {
      const response = await fetch(
        `${this.baseURL}/users/${username}/items?per_page=${perPage}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('Qiita API error:', response.status, response.statusText);
        throw new Error(`Qiita API error: ${response.status}`);
      }

      const data = await response.json();
      const validated = QiitaArticleListSchema.parse(data);

      return validated;
    } catch (error) {
      console.error('Error fetching Qiita articles:', error);
      throw error;
    }
  }
}
```

**apps/api/src/services/zenn-service.ts:**
```typescript
import { ZennArticleListSchema, type ZennArticle } from '@my-portfolio/shared/types/zenn';

export class ZennService {
  private readonly baseURL = 'https://zenn.dev/api';

  async getUserArticles(username: string): Promise<ZennArticle[]> {
    try {
      const response = await fetch(`${this.baseURL}/articles?username=${username}&order=latest`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Zenn API error:', response.status, response.statusText);
        throw new Error(`Zenn API error: ${response.status}`);
      }

      const data = await response.json();
      const validated = ZennArticleListSchema.parse(data);

      return validated.articles;
    } catch (error) {
      console.error('Error fetching Zenn articles:', error);
      throw error;
    }
  }
}
```

**apps/api/src/services/github-service.ts:**
```typescript
import {
  GitHubRepositoryListSchema,
  type GitHubRepository,
} from '@my-portfolio/shared/types/github';

type Bindings = {
  GITHUB_TOKEN?: string;
};

export class GitHubService {
  private readonly baseURL = 'https://api.github.com';
  private readonly token?: string;

  constructor(env: Bindings) {
    this.token = env.GITHUB_TOKEN;
  }

  async getUserRepositories(username: string, perPage: number = 6): Promise<GitHubRepository[]> {
    try {
      const headers: Record<string, string> = {
        'User-Agent': 'Portfolio-App',
        Accept: 'application/vnd.github.v3+json',
      };

      // トークンがあれば使用（レート制限緩和）
      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }

      const response = await fetch(
        `${this.baseURL}/users/${username}/repos?sort=updated&per_page=${perPage}`,
        { headers }
      );

      if (!response.ok) {
        console.error('GitHub API error:', response.status, response.statusText);
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const validated = GitHubRepositoryListSchema.parse(data);

      return validated;
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      throw error;
    }
  }
}
```

**apps/api/src/routes/qiita.ts:**
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { QiitaService } from '../services/qiita-service';

const qiita = new Hono();

// Qiita記事一覧取得
qiita.get(
  '/articles/:username',
  zValidator(
    'param',
    z.object({
      username: z.string().min(1),
    })
  ),
  zValidator(
    'query',
    z.object({
      per_page: z.coerce.number().min(1).max(100).optional().default(20),
    })
  ),
  async (c) => {
    const { username } = c.req.valid('param');
    const { per_page } = c.req.valid('query');

    try {
      const service = new QiitaService();
      const articles = await service.getUserArticles(username, per_page);

      return c.json({ articles });
    } catch (error) {
      console.error('Qiita route error:', error);
      return c.json({ error: 'Failed to fetch Qiita articles' }, 500);
    }
  }
);

export default qiita;
```

**apps/api/src/routes/zenn.ts:**
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { ZennService } from '../services/zenn-service';

const zenn = new Hono();

// Zenn記事一覧取得
zenn.get(
  '/articles/:username',
  zValidator(
    'param',
    z.object({
      username: z.string().min(1),
    })
  ),
  async (c) => {
    const { username } = c.req.valid('param');

    try {
      const service = new ZennService();
      const articles = await service.getUserArticles(username);

      return c.json({ articles });
    } catch (error) {
      console.error('Zenn route error:', error);
      return c.json({ error: 'Failed to fetch Zenn articles' }, 500);
    }
  }
);

export default zenn;
```

**apps/api/src/routes/github.ts:**
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { GitHubService } from '../services/github-service';

type Bindings = {
  GITHUB_TOKEN?: string;
};

const github = new Hono<{ Bindings: Bindings }>();

// GitHubリポジトリ一覧取得
github.get(
  '/repositories/:username',
  zValidator(
    'param',
    z.object({
      username: z.string().min(1).max(39),
    })
  ),
  zValidator(
    'query',
    z.object({
      per_page: z.coerce.number().min(1).max(100).optional().default(6),
    })
  ),
  async (c) => {
    const { username } = c.req.valid('param');
    const { per_page } = c.req.valid('query');

    try {
      const service = new GitHubService(c.env);
      const repositories = await service.getUserRepositories(username, per_page);

      return c.json({ repositories });
    } catch (error) {
      console.error('GitHub route error:', error);
      return c.json({ error: 'Failed to fetch GitHub repositories' }, 500);
    }
  }
);

export default github;
```

**apps/api/src/routes/articles.ts:**
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { QiitaService } from '../services/qiita-service';
import { ZennService } from '../services/zenn-service';
import type { UnifiedArticle } from '@my-portfolio/shared/types/article';

const articles = new Hono();

// Qiita + Zenn 統合エンドポイント
articles.get(
  '/unified/:username',
  zValidator(
    'param',
    z.object({
      username: z.string().min(1),
    })
  ),
  zValidator(
    'query',
    z.object({
      qiita_username: z.string().optional(),
      zenn_username: z.string().optional(),
      limit: z.coerce.number().min(1).max(50).optional().default(20),
    })
  ),
  async (c) => {
    const { username } = c.req.valid('param');
    const { qiita_username, zenn_username, limit } = c.req.valid('query');

    try {
      const qiitaService = new QiitaService();
      const zennService = new ZennService();

      // 並行で取得
      const [qiitaArticles, zennArticles] = await Promise.allSettled([
        qiitaService.getUserArticles(qiita_username || username, limit),
        zennService.getUserArticles(zenn_username || username),
      ]);

      // 統合フォーマットに変換
      const unifiedArticles: UnifiedArticle[] = [];

      // Qiita記事を変換
      if (qiitaArticles.status === 'fulfilled') {
        unifiedArticles.push(
          ...qiitaArticles.value.map((article) => ({
            id: article.id,
            title: article.title,
            url: article.url,
            publishedAt: article.created_at,
            likes: article.likes_count,
            platform: 'qiita' as const,
            tags: article.tags.map((tag) => tag.name),
          }))
        );
      }

      // Zenn記事を変換
      if (zennArticles.status === 'fulfilled') {
        unifiedArticles.push(
          ...zennArticles.value.map((article) => ({
            id: article.id.toString(),
            title: article.title,
            url: `https://zenn.dev${article.path}`,
            publishedAt: article.published_at,
            likes: article.liked_count,
            platform: 'zenn' as const,
            emoji: article.emoji,
          }))
        );
      }

      // 日付でソート（新しい順）
      unifiedArticles.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      return c.json({
        articles: unifiedArticles.slice(0, limit),
        meta: {
          qiita_count: qiitaArticles.status === 'fulfilled' ? qiitaArticles.value.length : 0,
          zenn_count: zennArticles.status === 'fulfilled' ? zennArticles.value.length : 0,
        },
      });
    } catch (error) {
      console.error('Unified articles route error:', error);
      return c.json({ error: 'Failed to fetch articles' }, 500);
    }
  }
);

export default articles;
```

**apps/api/src/index.ts（更新）:**
```typescript
import { Hono } from 'hono';
import qiita from './routes/qiita';
import zenn from './routes/zenn';
import github from './routes/github';
import articles from './routes/articles';

type Bindings = {
  GITHUB_TOKEN?: string;
  INTERNAL_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// 内部認証ミドルウェア
app.use('*', async (c, next) => {
  const apiKey = c.req.header('X-Internal-API-Key');
  if (apiKey !== c.env.INTERNAL_API_KEY) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  await next();
});

// ヘルスチェック
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: Date.now() });
});

// ルートをマウント
app.route('/qiita', qiita);
app.route('/zenn', zenn);
app.route('/github', github);
app.route('/articles', articles);

// 型エクスポート（Hono RPC用）
export type AppType = typeof app;

export default app;
```

#### BFF層の実装

**apps/web/src/lib/api-client.ts:**
```typescript
import { hc } from 'hono/client';
import type { AppType } from '@my-portfolio/api';

type Env = {
  API: Fetcher;
  INTERNAL_API_KEY: string;
};

// 共通APIクライアントの作成
export function createApiClient(env: Env) {
  return hc<AppType>('http://dummy', {
    fetch: env.API.fetch.bind(env.API),
    headers: {
      'X-Internal-API-Key': env.INTERNAL_API_KEY,
    },
  });
}

// Server Component用のヘルパー
export function getApiEnv(): Env {
  return {
    API: process.env.API as unknown as Fetcher,
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY!,
  };
}
```

**apps/web/src/features/show-article-list/api/articles.ts:**
```typescript
import { createApiClient, getApiEnv } from '@/lib/api-client';
import type { UnifiedArticle } from '@my-portfolio/shared/types/article';

export async function getUnifiedArticles(
  username: string,
  options?: {
    qiitaUsername?: string;
    zennUsername?: string;
    limit?: number;
  }
): Promise<UnifiedArticle[]> {
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.articles.unified[':username'].$get({
      param: { username },
      query: {
        qiita_username: options?.qiitaUsername,
        zenn_username: options?.zennUsername,
        limit: options?.limit?.toString(),
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching unified articles:', error);
    throw error;
  }
}

export async function getQiitaArticles(username: string, perPage?: number) {
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.qiita.articles[':username'].$get({
      param: { username },
      query: perPage ? { per_page: perPage.toString() } : undefined,
    });

    if (!res.ok) {
      throw new Error(`Qiita API error: ${res.status}`);
    }

    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching Qiita articles:', error);
    throw error;
  }
}

export async function getZennArticles(username: string) {
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.zenn.articles[':username'].$get({
      param: { username },
    });

    if (!res.ok) {
      throw new Error(`Zenn API error: ${res.status}`);
    }

    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching Zenn articles:', error);
    throw error;
  }
}
```

**apps/web/src/features/show-github-repository/api/github.ts:**
```typescript
import { createApiClient, getApiEnv } from '@/lib/api-client';
import type { GitHubRepository } from '@my-portfolio/shared/types/github';

export async function getGitHubRepositories(
  username: string,
  perPage?: number
): Promise<GitHubRepository[]> {
  const env = getApiEnv();
  const client = createApiClient(env);

  try {
    const res = await client.github.repositories[':username'].$get({
      param: { username },
      query: perPage ? { per_page: perPage.toString() } : undefined,
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    return data.repositories;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
}
```

**使用例（Server Component）:**
```typescript
// apps/web/src/app/articles/page.tsx
import { getUnifiedArticles } from '@/features/show-article-list/api/articles';
import { CommonArticleCard } from '@/features/show-article-list/components/CommonArticleCard';

export default async function ArticlesPage() {
  const articles = await getUnifiedArticles('your-username', {
    limit: 20,
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <CommonArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
```

---

### Phase 5: キャッシュとパフォーマンス最適化（オプション）

**目標**: Cloudflare KVを使ったキャッシュとエラーハンドリングの改善

#### タスク一覧

1. **キャッシュ実装**
   - [ ] Cloudflare KV namespace作成
   - [ ] キャッシュミドルウェア実装
   - [ ] TTL設定（記事: 1時間、リポジトリ: 30分など）

2. **エラーハンドリング改善**
   - [ ] カスタムエラークラス作成
   - [ ] エラーロギング強化
   - [ ] フォールバック処理

3. **レート制限対策**
   - [ ] リクエスト回数制限実装
   - [ ] バックオフ戦略

#### キャッシュ実装例

**apps/api/wrangler.toml（KV追加）:**
```toml
name = "portfolio-api"
main = "src/index.ts"
compatibility_date = "2024-12-01"

[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"

[vars]
NODE_ENV = "production"
```

**apps/api/src/middleware/cache.ts:**
```typescript
import type { Context, Next } from 'hono';

type Bindings = {
  CACHE: KVNamespace;
};

export async function cacheMiddleware(c: Context<{ Bindings: Bindings }>, next: Next) {
  const cacheKey = `cache:${c.req.method}:${c.req.url}`;

  // キャッシュから取得を試みる
  const cached = await c.env.CACHE.get(cacheKey);
  if (cached) {
    return c.json(JSON.parse(cached));
  }

  // レスポンスを取得
  await next();

  // 成功レスポンスをキャッシュ
  if (c.res.status === 200) {
    const body = await c.res.clone().json();
    await c.env.CACHE.put(cacheKey, JSON.stringify(body), {
      expirationTtl: 3600, // 1時間
    });
  }
}
```



---

## 🚀 デプロイ手順

### 初回デプロイ

**重要**: Backend Workerを先にデプロイする必要があります。

```bash
# Step 1: Backend Workerをデプロイ
cd apps/api
pnpm wrangler deploy

# Step 2: Cloudflareダッシュボードで環境変数を設定
# Workers & Pages > portfolio-api > Settings > Variables
# - GITHUB_TOKEN (Secret)
# - INTERNAL_API_KEY (Secret)

# Step 3: BFF Workerをデプロイ
cd ../web
pnpm wrangler deploy

# Step 4: Cloudflareダッシュボードで環境変数を設定
# Workers & Pages > portfolio-web > Settings > Variables
# - INTERNAL_API_KEY (Variable) ← Backend層と同じ値
```

### 環境変数の設定

**Cloudflareダッシュボード:**

1. **Backend Worker (portfolio-api)**
   - `GITHUB_TOKEN`: GitHub Personal Access Token (Secret)
   - `INTERNAL_API_KEY`: ランダム生成された長い文字列 (Secret)
     ```bash
     # 生成例
     openssl rand -base64 32
     ```

2. **BFF Worker (portfolio-web)**
   - `INTERNAL_API_KEY`: Backend層と同じ値 (Variable または Secret)

---

## 🔍 動作確認チェックリスト

### Phase 1完了後
- [ ] `pnpm install` がエラーなく完了
- [ ] `turbo build --filter=@my-portfolio/web` が成功
- [ ] `turbo dev --filter=@my-portfolio/web` でローカル起動
- [ ] 既存機能（記事一覧など）が正常に動作

### Phase 2完了後
- [ ] Backend Workerが単独で起動（`cd apps/api && pnpm dev`）
- [ ] ヘルスチェック (`http://localhost:8788/health`) が成功
- [ ] BFF Workerが起動時にService Bindingを認識
- [ ] 両Workerが同時起動可能

### Phase 3完了後
- [ ] `turbo type-check` がエラーなし
- [ ] 共有型定義（Qiita、Zenn、GitHub、統合記事）が正しくインポートされる
- [ ] IDE補完が動作

### Phase 4完了後
- [ ] ローカルでQiita記事取得が成功
- [ ] ローカルでZenn記事取得が成功
- [ ] ローカルでGitHubリポジトリ取得が成功
- [ ] ローカルで統合記事エンドポイントが成功
- [ ] Backend Workerデプロイ成功
- [ ] BFF Workerデプロイ成功
- [ ] 本番環境で全API動作確認
- [ ] Backend Workerに直接アクセスすると404

### Phase 5完了後（オプション）
- [ ] キャッシュが正常に動作
- [ ] レスポンス時間が改善
- [ ] エラーハンドリングが適切

---

## 🐛 トラブルシューティング

### Service Bindingが接続されない

**エラー**: `Service binding "API" not found`

**解決策**:
```bash
# Backend Workerを先に起動
cd apps/api
pnpm dev

# 別ターミナルでBFF Worker起動
cd apps/web
pnpm dev
```

### 型エラー: `AppType`が見つからない

**エラー**: `Cannot find module '@my-portfolio/api'`

**解決策**:
```bash
# Backend Workerをビルド
cd apps/api
pnpm build

# 依存関係を再インストール
cd ../..
pnpm install
```

### 環境変数が`undefined`

**ローカル開発時**:
- `.dev.vars` ファイルを作成しているか確認
- ファイル名が正確か確認（`.env` ではなく `.dev.vars`）

**本番環境**:
- Cloudflareダッシュボードで設定されているか確認
- Secretとして設定すべきものがVariableになっていないか確認

### CORS エラー

**原因**: Service Bindingは内部通信なのでCORSは不要

**もしCORSエラーが出る場合**:
- Service Bindingが正しく設定されているか確認
- 直接URLでfetchしていないか確認（Service Bindingを使う）

---

## 📊 コスト試算

### リクエスト課金

- **Service Bindingsは課金されない**: BFF → Backend間の通信は無料
- **ユーザーからのリクエストのみ**: 1外部リクエスト = 1課金

### CPU時間課金

- **合計で課金**: BFF + Backendの合計CPU時間
- **I/O待機は除外**: 外部API待ち時間は課金されない
- **重複は1回**: 並行処理の重複時間は二重課金なし

### 推定コスト

**月間10万リクエスト（個人サイト想定）:**
- 現在: $0/月（無料枠）
- BFF構成: $0/月（無料枠、変わらず）

**月間100万リクエスト:**
- 現在: $0-0.50/月
- BFF構成: $0-0.60/月（+$0.10、約10%増）

**セキュリティ向上の価値と比較して十分に許容範囲**

---

## 📚 参考コマンド

```bash
# Monorepo全体のインストール
pnpm install

# 全Workerのビルド
turbo build

# 全Workerの開発サーバー起動
turbo dev

# 特定Workerのみ
turbo build --filter=@my-portfolio/api
turbo dev --filter=@my-portfolio/web

# 型チェック
turbo type-check

# Lint
turbo lint

# Backend Workerのみデプロイ
cd apps/api && pnpm wrangler deploy

# BFF Workerのみデプロイ
cd apps/web && pnpm wrangler deploy

# ログ確認
cd apps/api && pnpm wrangler tail
```

---

## 🎯 実装優先順位

1. **Phase 1**: Monorepo構造 ⭐⭐⭐⭐⭐（必須）
2. **Phase 2**: Backend Worker作成 ⭐⭐⭐⭐⭐（必須）
3. **Phase 3**: 共有型定義 ⭐⭐⭐⭐（重要）
4. **Phase 4**: 全API移行 ⭐⭐⭐⭐⭐（必須、Phase 3と並行可）
5. **Phase 5**: キャッシュ最適化 ⭐⭐（オプション）

**推奨実装順序**:
1. Phase 1 → Phase 2でMonorepo基礎を構築
2. Phase 3で型定義を作成
3. Phase 4で全API（Qiita、Zenn、GitHub）を一気に移行
4. Phase 5は必要に応じて追加

---

## ✅ 最終確認事項

### セキュリティ
- [ ] Backend Workerに`routes`が設定されていない
- [ ] 機密情報（GitHub token）がBFF層の環境変数にない
- [ ] 内部API認証が実装されている
- [ ] 全エンドポイントにZodバリデーション

### 動作確認
- [ ] ローカル開発環境で全API動作
- [ ] 本番環境で全API動作
- [ ] Qiita記事が正しく表示される
- [ ] Zenn記事が正しく表示される
- [ ] GitHub リポジトリが正しく表示される
- [ ] 統合記事エンドポイントが正しく動作
- [ ] Service Bindingが正しく機能
- [ ] エラーハンドリングが適切

### パフォーマンス
- [ ] 不要なService Binding呼び出しがない
- [ ] レスポンスサイズが適切
- [ ] CPU時間が想定内
- [ ] 統合エンドポイントで並行処理が動作

### アーキテクチャ
- [ ] BFF層は外部APIを直接呼び出していない
- [ ] 全ての外部API呼び出しがBackend層に集約されている
- [ ] 型定義が共有パッケージで管理されている
- [ ] エラーハンドリングが一元化されている

---

**Document Version**: 1.1 (全API Backend層統一版)
**Target**: Next.js 15 + Hono.js 4 + Cloudflare Workers + Turborepo
**Last Updated**: 2024-12-17
**Changes**: 
- Qiita、Zenn、GitHub全てのAPIをBackend層に移行
- 統合記事エンドポイント追加
- Service層とRoute層の分離
- 共通APIクライアントの追加

このドキュメントをClaude Codeに提供し、Phase 1から順次実装を進めてください。
全ての外部API呼び出しをBackend層に集約することで、将来的なキャッシュ戦略やレート制限管理が容易になります。
