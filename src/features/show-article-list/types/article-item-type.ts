// QiitaのAPIから取得できるユーザーの記事データのタイプ
// https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF

// zennの半公式APIから取得できるユーザーの記事データ
// https://zenn.dev/h_ymt/articles/5e44b4967f6764#comment-11db82cbe67ca1

// Zennの記事
export type ZennArticleItem = {
  path: string;
  title: string;
  article_type: "記事" | "スクラップ";
  // Zennの記事APIにトピック(タグ)を取得する機能は無い
  published_at: string;
  body_updated_at: string;
};

//Zennのスクラップ
export type ZennScrapsItem = {
  path: string;
  title: string;
  topics: ZennScapsTopics[] | null;
  created_at: string;
  last_comment_created_at: string;
};

export type ZennScapsTopics = {
  name: string;
};

// Qiitaの記事のタイプ

export type QiitaArticleItem = {
  url: string;
  title: string;
  article_type: string;
  // Zennの記事APIにトピック(タグ)を取得する機能ないのでnull可
  tags: QiitaArticleTags[] | null;
  updated_at: string;
  created_at: string;
};

export type QiitaArticleTags = {
  name: string;
};

//共通の型
export type CommonArticleItem = {
  url: string;
  title: string;
  article_type: string;
  tags: { name: string }[] | null;
  created_at: string;
  updated_at: string;
};
