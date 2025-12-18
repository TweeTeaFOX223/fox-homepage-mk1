私のホームページのソースコードです。Next.js使用。

## アーキテクチャ

- **モノレポ構成**: Turborepo を使用
- **Backend**: Hono.js (Cloudflare Workers)
- **Frontend**: Next.js 16 + OpenNext (Cloudflare Workers)
- **型共有**: TypeScript Project References

## プロジェクト構造

```
.
├── apps/
│   ├── api/          # Hono.js バックエンド (Cloudflare Workers)
│   └── web/          # Next.js フロントエンド (OpenNext + Cloudflare Workers)
└── packages/
    └── shared/       # 共有型定義
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

READMEの内容は準備中。
