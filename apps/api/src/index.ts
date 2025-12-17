import { Hono } from 'hono';
import qiita from './routes/qiita';
import zenn from './routes/zenn';
import github from './routes/github';
import articles from './routes/articles';

type Bindings = {
  GITHUB_TOKEN?: string;
  QIITA_TOKEN?: string;
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

// 型エクスポート(Hono RPC用)
export type AppType = typeof app;

export default app;
