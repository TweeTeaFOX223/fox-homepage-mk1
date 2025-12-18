# Portfolio Homepage

私のポートフォリオサイトのソースコードです。BFF（Backend for Frontend）アーキテクチャを採用し、Cloudflare Workersにデプロイしています。

## 🏗️ アーキテクチャ概要

### システム構成図

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Edge Network                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────┐      ┌──────────────────────┐  │
│  │   Web Worker (home)    │      │  API Worker          │  │
│  │   Next.js 16 + OpenNext│◄────►│  (portfolio-api)     │  │
│  │                        │      │  Hono.js             │  │
│  └────────────────────────┘      └──────────────────────┘  │
│           │                                │                 │
│           │                                │                 │
│           ▼                                ▼                 │
│  ┌────────────────────────┐      ┌──────────────────────┐  │
│  │  R2 Bucket             │      │  External APIs       │  │
│  │  (ISR Cache)           │      │  - GitHub API        │  │
│  │  next-cache-bucket     │      │  - Qiita API         │  │
│  └────────────────────────┘      │  - Zenn API          │  │
│                                   └──────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         ▲
         │
    User Access
```

### 通信フロー

1. **ユーザー → Web Worker**: ブラウザからページリクエスト
2. **Web Worker → API Worker**: Service Bindingを使用した内部Worker間通信（認証付き）
3. **API Worker → External APIs**: GitHub/Qiita/Zenn APIからデータ取得
4. **API Worker → Web Worker**: JSON形式でデータ返却
5. **Web Worker → R2 Bucket**: ISRキャッシュの保存・取得
6. **Web Worker → ユーザー**: レンダリングされたHTMLを返却

### 技術スタック

#### **モノレポ管理**
- **Turborepo**: タスクオーケストレーション、ビルドキャッシュ
- **npm workspaces**: パッケージ管理

#### **Backend (API Worker)**
| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Hono.js** | 4.x | 軽量・高速なWeb API フレームワーク |
| **TypeScript** | 5.x | 型安全なコード |
| **Cloudflare Workers** | - | エッジコンピューティング環境 |
| **Zod** | 3.x | バリデーション・型推論 |

#### **Frontend (Web Worker)**
| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Next.js** | 16.x | Reactフレームワーク（App Router） |
| **React** | 19.x | UIライブラリ |
| **OpenNext** | 1.x | Next.js → Cloudflare Workers変換 |
| **Hono Client** | 4.x | 型安全なRPCクライアント |
| **TailwindCSS** | 3.x | ユーティリティファーストCSS |
| **Radix UI** | - | アクセシブルなUIコンポーネント |
| **TypeScript** | 5.x | 型安全なコード |

#### **共有パッケージ**
- **@my-portfolio/shared**: 型定義の共有（Article, GitHub Repository等）

#### **インフラ・デプロイ**
| 技術 | 用途 |
|------|------|
| **Cloudflare Workers** | サーバーレスコンピューティング |
| **Cloudflare R2** | ISRキャッシュストレージ |
| **Service Binding** | Worker間の内部通信 |
| **GitHub Actions** | CI/CDパイプライン |
| **Wrangler** | Cloudflareデプロイツール |

### 主要機能

#### **ISR (Incremental Static Regeneration)**
- **キャッシュ期間**: 1時間（3600秒）
- **ストレージ**: Cloudflare R2バケット
- **対象データ**:
  - Qiita/Zenn記事一覧
  - GitHub リポジトリ一覧

#### **Service Binding (Worker間通信)**
- **認証方式**: `X-Internal-API-Key` ヘッダー
- **メリット**:
  - パブリックインターネットを経由しない高速通信
  - レイテンシー削減
  - セキュリティ向上

#### **BFF (Backend for Frontend)**
- **役割**:
  - 複数の外部APIを集約
  - データの整形・フィルタリング
  - 認証情報の隠蔽

## 📁 プロジェクト構造

```
.
├── apps/
│   ├── api/                    # Backend Worker (Hono.js)
│   │   ├── src/
│   │   │   ├── index.ts        # エントリーポイント
│   │   │   ├── routes/         # API ルート定義
│   │   │   │   ├── articles.ts # 記事API（Qiita/Zenn）
│   │   │   │   └── github.ts   # GitHub API
│   │   │   └── middleware/     # 認証ミドルウェア
│   │   ├── wrangler.jsonc      # Cloudflare Workers設定
│   │   └── package.json
│   │
│   └── web/                    # Frontend Worker (Next.js + OpenNext)
│       ├── src/
│       │   ├── app/            # App Router
│       │   │   ├── page.tsx    # トップページ
│       │   │   └── layout.tsx  # レイアウト
│       │   ├── features/       # 機能別モジュール
│       │   │   ├── show-article-list/
│       │   │   │   ├── api/    # API呼び出しロジック
│       │   │   │   └── ui/     # UIコンポーネント
│       │   │   └── show-github-repository/
│       │   ├── lib/
│       │   │   └── api-client.ts  # Hono RPCクライアント
│       │   └── config/         # 環境変数管理
│       ├── wrangler.jsonc      # Cloudflare Workers設定
│       └── package.json
│
├── packages/
│   └── shared/                 # 共有型定義
│       ├── src/types/
│       │   ├── article.ts      # 記事型定義
│       │   └── github.ts       # GitHub型定義
│       └── package.json
│
├── .github/workflows/
│   └── deploy.yml              # CI/CDパイプライン
│
├── turbo.json                  # Turborepo設定
└── package.json                # ルートpackage.json
```

## CI/CD の注意点

### Wrangler OpenNext 誤検出の回避

モノレポ環境では、Wrangler が `node_modules/@opennextjs/cloudflare` の存在を検出して、すべてのWorkerをOpenNextプロジェクトとして扱おうとする問題があります。

**問題**:
- `apps/api` は純粋な Hono Worker ですが、ルートの `node_modules/@opennextjs` を参照して OpenNext として誤検出される
- エラーメッセージ: `"OpenNext project detected, calling 'opennextjs-cloudflare deploy'"`

**回避策** (`.github/workflows/deploy.yml` で実装済み):
```yaml
# API デプロイ前に @opennextjs パッケージを一時的に隠す
- name: Temporarily hide OpenNext package from API
  run: |
    if [ -d "node_modules/@opennextjs" ]; then
      mv node_modules/@opennextjs node_modules/@opennextjs-hidden
    fi

# デプロイ後に復元
- name: Restore OpenNext package
  if: always()
  run: |
    if [ -d "node_modules/@opennextjs-hidden" ]; then
      mv node_modules/@opennextjs-hidden node_modules/@opennextjs
    fi
```

**参考情報**:
- [Cloudflare Workers SDK](https://github.com/cloudflare/workers-sdk)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- Wrangler の検出ロジックに関する公式ドキュメントは存在しないため、パッケージの存在で判定していると推測

### ビルド時の API 呼び出しエラーの回避

Next.js の ISR（Incremental Static Regeneration）を使用する場合、ビルド時には API サーバーが存在しないため `ECONNREFUSED` エラーが発生します。

**問題**:
```
Error: Failed to collect page data for /
[cause]: TypeError: Invalid URL
  code: 'ERR_INVALID_URL',
  input: 'undefined'
```

**解決策** (`apps/web/src/features/*/api/*.ts` と `apps/web/src/lib/api-client.ts` で実装済み):

1. **API呼び出し前の条件分岐**:
```typescript
// ビルド時はダミーデータを返す（INTERNAL_API_KEYがない = ビルド時）
if (!process.env.INTERNAL_API_KEY) {
  console.log('Build time: Returning empty array');
  return [];
}
```

2. **ダミークライアントの返却**:
```typescript
// api-client.ts
export function createApiClient(env: Env): ReturnType<typeof hc<AppType>> {
  // ビルド時: INTERNAL_API_KEYが空の場合はダミークライアントを返す
  if (!env.INTERNAL_API_KEY) {
    return hc<AppType>("http://localhost:8787", {
      headers: { "X-Internal-API-Key": "" },
    });
  }
  // ... 通常のクライアント作成処理
}
```

3. **環境変数のデフォルト値設定**:
```typescript
// config/index.ts
export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://t2fox.pages.dev';
```

**動作**:
- **ローカルビルド時**: 空のデータでビルドが成功し、静的HTMLが生成される（ダミークライアントは実際には呼ばれない）
- **本番環境**: `INTERNAL_API_KEY` が設定されているため、正常にAPIを呼び出す
- **ISR**: デプロイ後、初回アクセス時に実データを取得してキャッシュ（`revalidate: 3600`）

**参考情報**:
- [Next.js ISR Guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [Next.js unstable_cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
- この問題に関する公式ドキュメントは見つかっていないため、独自の解決策を実装

## 環境変数の設定

### 1. GitHub Actions (Repository secrets)
**設定場所**: `Settings → Secrets and variables → Actions → Repository secrets`

| 変数名 | 説明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API トークン |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID |

### 2. Cloudflare Workers 環境変数

#### API Worker (`portfolio-api`)
**設定場所**: `Workers & Pages → portfolio-api → Settings → Variables`

| 変数名 | 種類 | 説明 | 値の例 |
|--------|------|------|--------|
| `GITHUB_TOKEN` | Secret | GitHub Personal Access Token | `github_pat_11BIBQZMI0...` |
| `QIITA_TOKEN` | Secret | Qiita API トークン | `7185fa616ba95039...` |
| `INTERNAL_API_KEY` | Secret | 内部 API 認証キー | `a7dnp4mdwOf5v62G...` |

#### Web Worker (OpenNext)
**設定場所**: `Workers & Pages → (Web Worker名) → Settings → Variables`

| 変数名 | 種類 | 説明 | 値の例 |
|--------|------|------|--------|
| `INTERNAL_API_KEY` | Secret | 内部 API 認証キー（API と同じ値） | `a7dnp4mdwOf5v62G...` |
| `GITHUB_USERNAME` | Variable | GitHub ユーザー名 | `TweeTeaFOX223` |
| `ZENN_USERNAME` | Variable | Zenn ユーザー名 | `tweeteafox300` |
| `NEXT_PUBLIC_BASE_URL` | Variable | サイトの URL | `https://t2fox.pages.dev` |

**注意**:
- `INTERNAL_API_KEY` は API と Web で同じ値を設定してください
- `Secret` はマスクされ、`Variable` は平文で表示されます
- ビルド時は環境変数がなくてもデフォルト値で動作します（`config/index.ts` でフォールバック設定済み）

## 🚀 デプロイ

### 自動デプロイ (GitHub Actions)

`master` ブランチへのプッシュで自動的にデプロイされます。

**デプロイフロー**:
1. **Turborepoキャッシュの復元** - 高速ビルド
2. **npm依存関係のインストール** - `npm ci`
3. **R2バケットのクリア** - ISRキャッシュリセット
4. **Backend Workerのビルド・デプロイ** - `portfolio-api`
5. **Frontend Workerのビルド・デプロイ** - `home`

### 手動デプロイ

```bash
# Backend
cd apps/api
npm run deploy

# Frontend
cd apps/web
npm run build:worker
npm run deploy
```

## 🛠️ ローカル開発

### 前提条件

- Node.js 20.x
- npm 10.x
- Cloudflare アカウント（Wrangler認証済み）

### セットアップ

```bash
# 1. リポジトリのクローン
git clone https://github.com/yourusername/fox-homepage-mk1.git
cd fox-homepage-mk1

# 2. 依存関係のインストール
npm install

# 3. 環境変数の設定
cd apps/api
cp .dev.vars.example .dev.vars
# .dev.varsを編集してAPIトークンを設定

cd ../web
# 環境変数は wrangler.jsonc の vars に設定済み
```

### 開発サーバーの起動

```bash
# Backend (ターミナル1)
cd apps/api
npm run dev
# → http://localhost:8787

# Frontend (ターミナル2)
cd apps/web
npm run dev
# → http://localhost:3000
```

### ビルド

```bash
# Backend
npm run build --workspace=@my-portfolio/api

# Frontend
npm run build:worker --workspace=@my-portfolio/web
```

## 📊 パフォーマンス

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: 95+

**最適化施策**:
- Cloudflare Edge Network によるグローバル配信
- ISRによる静的コンテンツキャッシュ
- Service Bindingによる低レイテンシー通信
- Turborepoによる高速ビルド

## 📝 ライセンス

このプロジェクトのソースコードはMITライセンスの下で公開されています。

---

**開発者**: TweeTeaFOX223
**技術スタック**: Next.js 16 + Hono.js + Cloudflare Workers
**アーキテクチャ**: BFF + ISR + Turborepo
