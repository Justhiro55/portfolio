# Portfolio — Hiromichi Hagiwara

個人ポートフォリオサイト。研究業績・プロジェクト・CV を掲載しています。

- 公開URL: https://luminous-sundae-8d31f1.netlify.app/
- ベーステンプレート: [Astro Academia](https://github.com/maiobarbero/astro-academia)

## 技術スタック

Astro 5 / React 19 / Tailwind CSS + daisyUI / Framer Motion

## 開発

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に静的サイトを生成
npm run preview  # ビルド結果をローカルで確認
```

Node は `.nvmrc` のバージョン（22.11.0）を使用します。

## コンテンツの編集

サイトに表示される内容はほぼすべて以下の2ファイルで管理しています。

| ファイル | 内容 |
| --- | --- |
| `src/data/cv.ts` | 職歴 / 学歴 / スキル / 論文 / プロジェクト / 受賞 |
| `src/settings.ts` | プロフィール、SNSリンク、サイトURL、SEO設定 |

- `experiences` / `education` / `publications` / `projects` / `achievements` は **新しい順** に並べる。
- プロジェクト画像は `public/images/projects/` に置き、`image: '/images/projects/xxx.webp'` の形で参照する。
- OGP画像は `public/images/og.jpg`（`seo.default_image` で指定）。

ブログ記事を追加する場合は `src/content/BlogPosts/` に Markdown を置きます（front matter: `title` / `date` / `excerpt` / `tags`）。記事が1件以上あるとサイドバーに Blog リンクが表示されます。

## ページ構成

| パス | ファイル |
| --- | --- |
| `/` | `src/pages/index.astro`（Hero・最新プロジェクト3件・受賞） |
| `/works/` | `src/pages/works.astro` |
| `/research/` | `src/pages/research.astro` |
| `/papers/` | `src/pages/papers.astro` |
| `/cv/` | `src/pages/cv.astro` |
| `/blog/1/` | `src/pages/blog/[page].astro`（記事がある場合のみ生成） |

## デプロイ

Netlify（`netlify.toml`）。`main` への push で自動デプロイされます。
