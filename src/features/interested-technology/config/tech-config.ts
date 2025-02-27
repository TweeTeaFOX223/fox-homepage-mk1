import { TechCategory } from "../type/item-category-type";

// ここでアイコン呼ぶ
import {
  Code2,
  Brain,
  Cloud,
  Database,
  BookOpen,
  Monitor,
  Globe,
  FileJson,
  Bot,
  Workflow,
} from "lucide-react";

export const techConfig: TechCategory[] = [
  {
    title: "JavaScript/TypeScript",
    description: "ミニアプリの作成・ウェブサイト作成に。",
    style: {
      color: "bg-yellow-100 hover:bg-yellow-200",
      borderColor: "border-yellow-300",
    },
    icon: Code2,
    items: [
      {
        name: "Vite",
        description: "SPAのビルドに使用。これが使用できない時はWebpackを使う。",
        proficiency: 40,
        icon: Workflow,
      },
      {
        name: "Astro.js",
        description:
          "完全な静的サイトを作成する機会があれば使用したいと思っている。",
        proficiency: 10,
        icon: Globe,
      },
      {
        name: "Next.js",
        description:
          "動的サイトの作成に使用。Nextに慣れてきたらRemixにも触れてみたい。",
        proficiency: 25,
        icon: Globe,
      },
      {
        name: "Danfo.js",
        description:
          "クライアントサイドだけで簡単なデータ操作を行うアプリの作成に使用。",
        proficiency: 30,
        icon: FileJson,
      },
      {
        name: "Cytoscape.js、V6.js等",
        description: "ネットワークグラフの描画を行うアプリの作成に使用。",
        proficiency: 25,
        icon: FileJson,
      },
      {
        name: "Hono.js",
        description: "速くて型安全のバックエンド、すごそう。",
        proficiency: 3,
        icon: Globe,
      },
    ],
  },
  {
    title: "Python",
    description:
      "自然言語処理を行うために使用。サーバーサイドのシステムの作成にも使用。",
    style: {
      color: "bg-blue-100 hover:bg-blue-200",
      borderColor: "border-blue-300",
    },
    icon: Brain,
    items: [
      {
        name: "uv",
        description: "Pythonの仮想環境の構築用に使用。Anacondaから移行した。",
        proficiency: 50,
        icon: Workflow,
      },
      {
        name: "Gradio",
        description: "小規模な単発Webアプリの開発に使用。",
        proficiency: 25,
        icon: Globe,
      },
      {
        name: "Polars、DuckDB等",
        description:
          "SNSのデータを加工する際に使用。Polarsを使う機会が一番多い。",
        proficiency: 35,
        icon: Database,
      },
      {
        name: "Mecab、Vibrato等",
        description: "SNSの日本語データを形態素解析するために使用。",
        proficiency: 25,
        icon: FileJson,
      },
      {
        name: "discord.py",
        description: "Discordのbotを作成するのに使いたいと思っている。",
        proficiency: 5,
        icon: Bot,
      },
    ],
  },
  {
    title: "アプリのデプロイ、CI/CD",
    description: "Webアプリを公開したい",
    style: {
      color: "bg-green-100 hover:bg-green-200",
      borderColor: "border-green-300",
    },
    icon: Cloud,
    items: [
      {
        name: "Vercel",
        description: "Next.jsで作成したサイト(これ)のデプロイに使用。",
        proficiency: 20,
        icon: Cloud,
      },
      {
        name: "Hugging Face",
        description:
          "独自に作成した機械学習モデルやデータセットを公開したい…と少し思っている。",
        proficiency: 5,
        icon: Cloud,
      },
      {
        name: "GitHub Actions",
        description:
          "GitHub Pagesにウェブアプリをデプロイする際に使用。もう少し知識が身に付いたら、自動テストにも使用してみたい",
        proficiency: 40,
        icon: Workflow,
      },
      {
        name: "CloudFlareのPagesとWorkers",
        description: "Hono.jsでバックエンドを作る時に使用したいと思っている。",
        proficiency: 5,
        icon: Cloud,
      },
    ],
  },
  {
    title: "データベース",
    description: "ローカル",
    style: {
      color: "bg-purple-100 hover:bg-purple-200",
      borderColor: "border-purple-300",
    },
    icon: Database,
    items: [
      {
        name: "SQLite",
        description:
          "オフラインで動作するシステムのDBとして使用。スタンドアロンのアプリを作ることが多いので出番が多い。ORMから使っている。",
        proficiency: 25,
        icon: Database,
      },
      {
        name: "Supabase",
        description:
          "ウェブアプリに使用するために学習中。契約して使うのもいいけど、ローカルでホストしても使えるのが良すぎる。",
        proficiency: 10,
        icon: Database,
      },
      {
        name: "SQLAlchemy(Python)とPrisma(TS)",
        description: "Prismaに慣れてきたら、Drizzle ORMも試してみたい。",
        proficiency: 10,
        icon: Database,
      },
      {
        name: "普通のSQL文",
        description: "ORM使いまくりで、生SQL文をあまり使ったことがない。",
        proficiency: 15,
        icon: Database,
      },
    ],
  },
  {
    title: "開発や設計の手法",
    description: "現時点では俺流のベタ書きコードしか書けない…",
    style: {
      color: "bg-red-100 hover:bg-red-200",
      borderColor: "border-red-300",
    },
    icon: BookOpen,
    items: [
      {
        name: "オブジェクト指向関係",
        description:
          "Pythonを使ってSOLID原則を学習中。何となくわかった…ぐらいの理解度で、実際にキッチリ設計をしたことはない。",
        proficiency: 20,
        icon: Monitor,
      },
      {
        name: "bullet-roof-react",
        description:
          "このウェブサイトを作成するのに参考にした…が、あまり理解できているとは言えない感じ。",
        proficiency: 20,
        icon: Monitor,
      },
    ],
  },
  {
    title: "その他色々",
    description: "色々",
    style: {
      color: "bg-red-100 hover:bg-red-200",
      borderColor: "border-red-300",
    },
    icon: BookOpen,
    items: [
      {
        name: "Tailwindとshadcn/ui",
        description: "CSSはこれでいい気がする。",
        proficiency: 25,
        icon: Monitor,
      },
      {
        name: "マイクラのMOD開発",
        description:
          "オブジェクト指向の設計手法がわかってきたら、Javaを勉強しつつマイクラのSDKを試してみたい。",
        proficiency: 5,
        icon: Monitor,
      },
      {
        name: "マイクラの鯖運営(Linux)",
        description:
          "Linuxサーバー運用の知識が身に付いたら、マイクラの鯖運営を試してみたいと思っている。",
        proficiency: 10,
        icon: Monitor,
      },
    ],
  },
];
