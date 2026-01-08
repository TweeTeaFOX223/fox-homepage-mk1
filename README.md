# fox-homepage-mk1
私のホームページのソースコードです。
  
<a href="https://home.t2fox.workers.dev/">
<img src="https://raw.githubusercontent.com/TweeTeaFOX223/TweeTeaFOX223/refs/heads/main/OGP2.png" alt="T2フォックスのHP" width="720">
</a>  
  
## 目次
- [fox-homepage-mk1](#fox-homepage-mk1)
  - [目次](#目次)
  - [技術的なこと色々](#技術的なこと色々)
    - [システム構成図](#システム構成図)
    - [通信フロー](#通信フロー)
    - [技術スタック](#技術スタック)
      - [**AIエージェント**](#aiエージェント)
      - [**モノレポ管理**](#モノレポ管理)
      - [**Backend (API Worker)**](#backend-api-worker)
      - [**Frontend (Web Worker)**](#frontend-web-worker)
      - [**共有パッケージ**](#共有パッケージ)
      - [**インフラ・デプロイ**](#インフラデプロイ)
    - [主要機能](#主要機能)
      - [**ISR (Incremental Static Regeneration)**](#isr-incremental-static-regeneration)
      - [**Service Binding (Worker間通信)**](#service-binding-worker間通信)
      - [**BFF (Backend for Frontend)**](#bff-backend-for-frontend)
  - [📁 プロジェクト構造](#-プロジェクト構造)
  - [環境変数の設定](#環境変数の設定)
    - [1. GitHub Actions (Repository secrets)](#1-github-actions-repository-secrets)
      - [CLOUDFLARE\_API\_TOKEN の作成手順（Workersへのデプロイ用）](#cloudflare_api_token-の作成手順workersへのデプロイ用)
      - [R2 API トークン（S3互換 / ISRキャッシュ削除用）](#r2-api-トークンs3互換--isrキャッシュ削除用)
    - [2. Cloudflare Workers 環境変数](#2-cloudflare-workers-環境変数)
      - [API Worker (`portfolio-api`)](#api-worker-portfolio-api)
      - [Web Worker (OpenNext)](#web-worker-opennext)
  - [🚀 デプロイ](#-デプロイ)
    - [自動デプロイ (GitHub Actions)](#自動デプロイ-github-actions)
  - [デプロイ\&ビルド(CI/CD) の注意点](#デプロイビルドcicd-の注意点)
    - [Wrangler OpenNext 誤検出の回避](#wrangler-opennext-誤検出の回避)
    - [ビルド時の API 呼び出しエラーの回避](#ビルド時の-api-呼び出しエラーの回避)
  - [🛠️ ローカル開発](#️-ローカル開発)
    - [前提条件](#前提条件)
    - [セットアップ](#セットアップ)
    - [開発サーバーの起動](#開発サーバーの起動)
    - [手動デプロイ](#手動デプロイ)

## 技術的なこと色々
  
### システム構成図
![画像1](https://raw.githubusercontent.com/TweeTeaFOX223/fox-homepage-mk1/refs/heads/master/docs/%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E6%A7%8B%E6%88%90%E5%9B%B3.png) 

  
### 通信フロー

1. **ユーザー → Web Worker**: ブラウザからページリクエスト
2. **Web Worker → API Worker**: Service Bindingを使用した内部Worker間通信（認証付き）
3. **API Worker → External APIs**: GitHub/Qiita/Zenn APIからデータ取得
4. **API Worker → Web Worker**: JSON形式でデータ返却
5. **Web Worker → R2 Bucket**: ISRキャッシュの保存・取得
6. **Web Worker → ユーザー**: レンダリングされたHTMLを返却

### 技術スタック

#### **AIエージェント**
| サービス名 | モデル | 
| ---------------------- | ------ |
| **Claude Code**            | Claude Sonnet 4.5 | 
| **ChatGPT Code**         | GPT-5.2-Codex |
   
#### **モノレポ管理**
- **Turborepo**: タスクオーケストレーション、ビルドキャッシュ
- **pnpm workspaces**: パッケージ管理
  
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
  - Cloudflareのリクエスト数を節約
  - セキュリティ的に安全＆高速通信

#### **BFF (Backend for Frontend)**  
- Next.js(フロントエンドサーバー)では、シークレットの環境変数(各種APIのトークン)を一切扱わない。  
- 機密性の高い処理は全てHono.js(バックエンドサーバー)の方で行う。  
- RSCのサーバー/クライアントの境界線に関するミスをしても安全(フールプルーフ的な)。  
- **BFFの考え方**: フロントエンド専用のバックエンドを用意し、UIに必要なデータ取得や集約を担当させることで、フロントの実装を簡潔にする設計。  
- **本プロジェクトの構成**: Web Worker は画面描画に専念し、API Worker が外部API連携・認証・データ整形を担うため、BFFに近い構成。  
  
## 📁 プロジェクト構造

```
.
├── apps/
│   ├── api/                    # Backend Worker (Hono.js)
│   │   ├── src/
│   │   │   ├── index.ts        # エントリーポイント
│   │   │   ├── routes/         # API ルート定義
│   │   │   │   ├── articles.ts # 記事API（Qiita/Zenn）
│   │   │   │   ├── github.ts   # GitHub API
│   │   │   │   ├── qiita.ts    # Qiita API
│   │   │   │   └── zenn.ts     # Zenn API
│   │   │   └── services/       # 外部APIアクセス
│   │   │       ├── github-service.ts
│   │   │       ├── qiita-service.ts
│   │   │       └── zenn-service.ts
│   │   ├── wrangler.jsonc      # Cloudflare Workers設定
│   │   └── package.json
│   │
│   └── web/                    # Frontend Worker (Next.js + OpenNext)
│       ├── src/
│       │   ├── app/            # App Router
│       │   │   ├── apps/        # 公開中アプリ一覧 + 詳細
│       │   │   ├── articles/    # 記事一覧
│       │   │   ├── repositories/# GitHubリポジトリ一覧
│       │   │   ├── page.tsx     # トップページ
│       │   │   ├── layout.tsx   # レイアウト
│       │   │   ├── robots.ts    # robots.txt
│       │   │   └── sitemap.ts   # sitemap.xml
│       │   ├── components/     # 共通UI（Footer等）
│       │   ├── features/       # 機能別モジュール
│       │   │   ├── base-profile/
│       │   │   ├── interested-technology/
│       │   │   ├── navigation-bar/
│       │   │   ├── network-graph/
│       │   │   ├── show-apps/
│       │   │   ├── show-article-list/
│       │   │   ├── show-dev-reflection/
│       │   │   ├── show-github-repository/
│       │   │   └── show-poem-list/
│       │   ├── hooks/
│       │   ├── lib/            # APIクライアント・ユーティリティ
│       │   └── types/
│       ├── public/             # 画像・OGP等の静的ファイル
│       ├── config/             # 環境変数管理
│       ├── wrangler.jsonc      # Cloudflare Workers設定
│       └── package.json
│
├── packages/
│   └── shared/                 # 共有型定義
│       ├── src/types/
│       │   ├── article.ts      # 記事型定義
│       │   ├── github.ts       # GitHub型定義
│       │   ├── qiita.ts        # Qiita型定義
│       │   └── zenn.ts         # Zenn型定義
│       └── package.json
│
├── .github/workflows/
│   └── deploy.yml              # CI/CDパイプライン
│
├── turbo.json                  # Turborepo設定
└── package.json                # ルートpackage.json
```



## 環境変数の設定

### 1. GitHub Actions (Repository secrets)
**設定場所**: `Settings → Secrets and variables → Actions → Repository secrets`

| 変数名 | 説明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API トークン |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID |
| `R2_ACCESS_KEY_ID` | R2 API Access Key ID |
| `R2_SECRET_ACCESS_KEY` | R2 API Secret Access Key |

#### CLOUDFLARE_API_TOKEN の作成手順（Workersへのデプロイ用）
1. Cloudflare Dashboard にログイン  
2. 右上の **My Profile → API Tokens** を開く  
3. **Create Token** → **Edit Cloudflare Workers**（または同等のWorkerデプロイ権限）を選択  
4. 対象のアカウント（Account）と必要な権限を指定  
5. 生成されたトークンを `CLOUDFLARE_API_TOKEN` として登録  

**CLOUDFLARE_ACCOUNT_ID の確認方法**  
- Cloudflare Dashboard のURL内にある **アカウントID** を使用  
  例: `https://dash.cloudflare.com/0123456789abcdef/` の `0123456789abcdef`  

#### R2 API トークン（S3互換 / ISRキャッシュ削除用）
GitHub Actions で R2 のオブジェクト削除を行うため、**R2のS3互換APIトークン**が必要です。

 **R2 API Token 作成手順（S3互換**）
1. **Cloudflare Dashboard** にログイン  
   左サイドバーから **R2 → Overview** をクリック
2. **API Token 管理画面**を開く  
   右上の「Account Details」セクションにある **API Tokens** の **Manage** をクリック  
   （直接リンク: `https://dash.cloudflare.com/?to=/:account/r2/api-tokens`）
3. **Create API Token** をクリック  
   - **Create Account API token（推奨）**: アカウント全体で使用可能、手動で無効化するまで有効  
   - Create User API token: 個人ユーザーに紐付き、ユーザー削除で無効化
4. **Permissions** を設定  
   **Admin Read & Write** を選択（GitHub Actionsで削除操作を行うため必須）
5. **Bucket scope（任意）**  
   「Apply to specific buckets only」を選び、`next-cache-bucket` を指定することも可能  
   （全バケットにアクセスするならスキップでOK）
6. **トークン名**を設定  
   例: `github-actions-r2-cache-clear`
7. **Create API Token** をクリック
8. **認証情報をコピー**  
   ⚠️ **この画面は一度しか表示されません**  
   - Access Key ID  
   - Secret Access Key  
   Secret Access Key は再表示できないので必ず保存
9. **GitHub Secrets に追加**  
   `Settings → Secrets and variables → Actions → New repository secret`
   - `R2_ACCESS_KEY_ID` = Access Key ID  
   - `R2_SECRET_ACCESS_KEY` = Secret Access Key


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
2. **pnpm依存関係のインストール** - `pnpm install --frozen-lockfile`
3. **Backend Workerのビルド・デプロイ** - `portfolio-api`
4. **Frontend Workerのビルド・デプロイ** - `home`
5. **R2バケットのクリア（デプロイ後）** - ISRキャッシュリセット（S3 API経由）

**重要**:
OpenNext はデプロイ時にR2へISRキャッシュを自動作成するため、**デプロイ完了後にR2のISRキャッシュをクリアしないと反映が不安定**になります。  
そのため、キャッシュ削除は **デプロイ後** に実行する必要があります。  

## デプロイ&ビルド(CI/CD) の注意点

### Wrangler OpenNext 誤検出の回避

モノレポ環境では、GitHub ActionsのWrangler が `node_modules/@opennextjs/cloudflare` の存在を検出して、すべてのWorkerをOpenNextプロジェクトとして扱おうとする問題があります。公式ドキュメントを見ても原因わからなかったので、手動で色々と検証した結果、以下の方法で解決できると判明しました。

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
export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://home.t2fox.workers.dev/';
```

**動作**:
- **ローカルビルド時**: 空のデータでビルドが成功し、静的HTMLが生成される（ダミークライアントは実際には呼ばれない）
- **本番環境**: `INTERNAL_API_KEY` が設定されているため、正常にAPIを呼び出す
- **ISR**: デプロイ後、初回アクセス時に実データを取得してキャッシュ（`revalidate: 3600`）

## 🛠️ ローカル開発

### 前提条件

- Node.js 20.x
- pnpm 10.27.0
- Cloudflare アカウント（Wrangler認証済み）

### セットアップ

```bash
# 1. リポジトリのクローン
git clone https://github.com/yourusername/fox-homepage-mk1.git
cd fox-homepage-mk1

# 2. 依存関係のインストール
pnpm install

# 3. 環境変数の設定
cd apps/api
cp .dev.vars.example .dev.vars
# .dev.varsを編集してAPIトークンを設定

cd ../web
# 環境変数は wrangler.jsonc の vars に設定済み
```

### 開発サーバーの起動

```bash
#  フロントとバックが自動で立ち上がります
pnpm dev
```

### 手動デプロイ

```bash
# フロントとバックが両方デプロイされます
pnpm deploy
```



