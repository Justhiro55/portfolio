export const experiences = [
	{
		company: '楽天グループ株式会社',
		time: '2026年4月 -',
		title: 'アプリケーションエンジニア（新卒）',
		location: 'Tokyo, Japan',
		description: '新卒入社予定',
	},
	{
		company: '株式会社HERP',
		time: '2025年5月 - 2025年12月',
		title: 'Internship',
		location: 'Tokyo, Japan',
		description: 'Webアプリケーション開発',
	},
	{
		company: 'franky株式会社',
		time: '2024年4月 - 2024年10月',
		title: 'Internship',
		location: 'Tokyo, Japan',
		description: 'ファッション系ECサイトの開発に携わり、主にバックエンドの実装や機能改善を担当しました。',
	},
	{
		company: '東京大学 松尾研究室',
		time: '2024年8月 - 2024年9月',
		title: 'サマースクール - 深層生成モデル',
		location: 'Tokyo, Japan',
		description: '深層生成モデルの理論と実装について学び、最新の機械学習技術に関する研究に参加しました。',
	},
	{
		company: 'GMOインターネット株式会社',
		time: '2024年8月',
		title: 'kitaQサマーインターン / Webアプリケーション開発',
		location: 'Fukuoka, Japan',
		description: 'ハッカソンにてUI/UXを改善し初心者にもVPSを使いやすくするコンパネの改善案を提案・開発し、最優秀賞を受賞しました。',
	},
	{
		company: 'GMOインターネット株式会社',
		time: '2021年9月',
		title: 'kitaQサマーインターン / セキュリティエンジニア',
		location: 'Fukuoka, Japan',
		description: '脆弱性診断、ログ分析といったセキュリティ業務を経験させていただきました。',
	},
];

export const education = [
	{
		school: '42Tokyo',
		time: '2025年10月 - 現在',
		degree: 'Second Circle',
		location: 'Tokyo, Japan',
		description: 'Second Circleでは、Cybersecurity / Operating Systems / Web & Mobile Development / Graphics & Video Games / Artificial Intelligence の5分野を選び専門的に学びます。',
	},
	{
		school: '公立はこだて未来大学大学院',
		time: '2023年4月 - 2026年3月',
		degree: '博士前期課程 情報アーキテクチャ領域',
		location: 'Hokkaido, Japan',
		description: 'MPTCP(Multipath TCP)に関するネットワークセキュリティ研究を行っています。学部時の研究を発展させ、TCPを標的とする最適化したDoS攻撃手法について研究しています。',
	},
	{
		school: '42Tokyo',
		time: '2023年5月 - 2025年10月',
		degree: 'First Circle',
		location: 'Tokyo, Japan',
		description: '体系的にコンピューターサイエンスの基礎から学んでいます。bashの再実装、グラフィックの課題など幅広い課題に取り組みました。',
	},
	{
		school: '公立はこだて未来大学',
		time: '2019年4月 - 2023年3月',
		degree: '情報アーキテクチャ学科 情報システムコース',
		location: 'Hokkaido, Japan',
		description: '学部3年次にはチームでアプリ開発に取り組み、学部4年次にはネットワークセキュリティに関する研究を行いました。',
	},
];

export const skills = [
	{
		title: 'ネットワークセキュリティ',
		description: 'TCP/IP, MPTCP, DoS攻撃手法の研究, 脆弱性診断, ネットワークシミュレーション (ns3), Wireshark',
	},
	{
		title: 'プログラミング言語',
		description: 'C++, JavaScript/TypeScript, Python, Swift, Bash/Shell scripting',
	},
	{
		title: 'Web開発技術',
		description: 'フルスタック開発, バックエンド開発, React, Node.js, データベース設計, API設計',
	},
	{
		title: 'システム開発',
		description: 'Unix/Linux, Docker, Git, CI/CD, アジャイル開発, スクラム開発',
	},
	{
		title: '機械学習',
		description: '深層生成モデル',
	},
	{
		title: 'モバイルアプリ開発',
		description: 'iOS開発 (Swift), Beacon技術, Spotify API連携',
	},
];

export const publications = [
	{
		title: 'A Proposal for LDoS Attack Method Using MPTCP Signal Manipulation',
		authors: 'Hiromichi Hagiwara, Hiroshi Inamura, Shigemi Ishida',
		journal: 'infsoc.org',
		time: '2025年9月',
		link: 'http://www.infsoc.org/conference/iwin2025/',
		abstract: 'Proposal of an LDoS attack method using MPTCP signal manipulation. We improved upon conventional attack techniques and studied more effective attack methods.',
		tags: ['Excellent Paper Award'],
	},
	{
		title: 'Optimistic ACKing を利用した LDoS 攻撃効果の検証',
		authors: '萩原 啓道, 久末 瑠紅, 稲村 浩, 石田 繁巳',
		journal: 'pub.confit.atlas.jp',
		time: '2024年9月',
		link: 'https://pub.confit.atlas.jp/ja/event/society2024/presentation/A-7-02',
		abstract: 'Optimistic ACKing機能を悪用したLDoS攻撃の効果を検証し、その脅威レベルと対策について分析を行いました。',
	},
];

export const projects = [
	{
		title: 'Mogu — AI献立提案アプリ',
		time: '2026年1月',
		description: 'AIを活用した献立提案アプリ。パーソナライズされた料理提案、買い物リスト自動生成、調理ガイド機能を実装。Flutter/DartによるiOS/Androidフロントエンド開発からFirebaseバックエンド構築まで担当。技育CAMP Vol.18 最優秀賞受賞。',
		technologies: ['Flutter', 'Dart', 'Firebase', 'AI'],
		links: {
			website: 'https://x.com/geek_pjt/status/2012813374997017077?s=20',
		},
		category: 'mobile-app' as const,
	},
	{
		title: 'Kioku — エディタでスキマ時間に学べる単語帳拡張機能',
		time: '2025年',
		description: 'VSCode拡張として動作し、プログラミングの合間に単語をタイピングで覚えられる英単語学習アプリ。Ankiのような反復学習を取り入れ、エビングハウスの忘却曲線を利用して効率よく記憶を定着させることを目指しました。',
		technologies: ['TypeScript', 'VSCode Extension API'],
		links: {
			github: 'https://github.com/Justhiro55/Kioku',
			demo: 'https://marketplace.visualstudio.com/items?itemName=Justhiro55.kioku&ssr=false#review-details',
		},
		category: 'extension' as const,
	},
	{
		title: 'flop — C/C++/Rust向けデバッグ出力切り替えツール',
		time: '2025年10月',
		description: 'printf や println! をコマンド一発でコメントアウト・有効化・削除できるデバッグ出力管理ツール。インタラクティブなTUIで直感的に操作できます。crates.ioにてパッケージを公開しています。',
		technologies: ['Rust', 'TUI'],
		links: {
			github: 'https://github.com/Justhiro55/flop',
			article: 'https://zenn.dev/justhiro/articles/7df05cb2064b75',
			demo: 'https://crates.io/crates/flop-cli',
		},
		category: 'cli-tool' as const,
	},
	{
		title: 'httpcat — HTTPステータスを猫で確認できるCLIツール',
		time: '2025年11月',
		description: 'HTTPリクエストのステータスコードに応じた猫画像をターミナルに表示するCLIツール。curlやwgetの代わりに、ステータス確認を楽しく行えます。ASCII表示にも対応。crates.ioにてパッケージを公開しています。',
		technologies: ['Rust', 'CLI'],
		links: {
			github: 'https://github.com/Justhiro55/httpcat',
			article: 'https://zenn.dev/justhiro/articles/a26e3cb1949f60',
			demo: 'https://crates.io/crates/httpcat',
		},
		category: 'cli-tool' as const,
	},
	{
		title: 'should-i — 意思決定を委ねるCLIツール',
		time: '2025年11月',
		description: '質問を投げかけるとYES/NO/MAYBEで答えてくれるCLIツール。yesno.wtf APIを使用し、回答と一緒にGIF画像も表示。--openオプションでGIFをブラウザで自動表示できます。日常の小さな決断から技術選定まで、宇宙に判断を委ねられます。',
		technologies: ['Rust', 'CLI', 'API'],
		links: {
			github: 'https://github.com/Justhiro55/should-i',
			article: 'https://zenn.dev/justhiro/articles/5351c337282175',
			demo: 'https://crates.io/crates/should-i',
		},
		category: 'cli-tool' as const,
	},
	{
		title: 'ft_transcendence — リアルタイム対戦Pongゲーム',
		time: '2025年',
		description: '42Tokyoの最終課題として開発したリアルタイム対戦型Pongゲーム。WebSocketを使用したリアルタイム通信、OAuth認証、チャット機能などを実装しました。',
		technologies: ['TypeScript', 'NestJS', 'PostgreSQL', 'WebSocket', 'Docker'],
		links: {
			github: 'https://github.com/Justhiro55/ft_transcendence',
		},
		category: 'web-app' as const,
	},
	{
		title: 'minishell — Bashシェルの再実装',
		time: '2024年',
		description: '42Tokyoの課題としてBashシェルを再実装。パイプ、リダイレクト、環境変数、シグナル処理などの基本的なシェル機能を実装しました。',
		technologies: ['C', 'Unix/Linux'],
		links: {
			github: 'https://github.com/Justhiro55/minishell',
			demo: 'https://www.youtube.com/watch?v=fUfyKEn5N5E',
		},
		category: 'other' as const,
	},
	{
		title: 'Funport — 学内ポートフォリオサービス',
		time: '2023年 - 2025年',
		description: '大学公認プロジェクト「Funcy」にて学内ポートフォリオサービス「Funport」を約2年間開発。フロントエンド・バックエンドの実装からGCP（Cloud Run, Cloud Build）を用いたインフラ構築、Auth0認証基盤の導入まで担当。後輩への技術指導も経験。',
		technologies: ['TypeScript', 'React', 'GCP', 'Auth0'],
		links: {
			website: 'https://sites.google.com/view/funcyict/%E3%83%9B%E3%83%BC%E3%83%A0',
		},
		category: 'web-app' as const,
	},
	{
		title: 'ConoHA VPSコントロールパネル改善',
		time: '2024年8月',
		description: 'GMOインターネット株式会社のkitaQサマーインターンにて開発。UI/UXを改善し初心者にもVPSを使いやすくするコントロールパネルの改善案を提案・開発し、最優秀賞を受賞しました。',
		technologies: ['TypeScript', 'React', 'UI/UX Design'],
		links: {
			github: 'https://github.com/Justhiro55/ConoHA',
		},
		category: 'web-app' as const,
	},
	{
		title: 'ビーコン・Spotify APIを使ったiOSアプリ開発',
		time: '2021年 - 2022年',
		description: 'ビーコン技術を利用して周りの人と好きな音楽を共有し、好きな曲を共有し合う楽しさを感じるiOSアプリを制作。チーム構成は3人で、スクラム開発手法を採用。バックエンド全般を主に担当し、SpotifyAPIとの通信などを実装しました。',
		technologies: ['Swift', 'iOS', 'Beacon', 'Spotify API'],
		category: 'mobile-app' as const,
	},
];

export const achievements = [
	{
		title: 'IWIN2025 - A Proposal for LDoS Attack Method Using MPTCP Signal Manipulation',
		time: '2025年9月',
		description: 'Proposal of an LDoS attack method using MPTCP signal manipulation. We improved upon conventional attack techniques and studied more effective attack methods.',
		tags: ['Excellent Paper Award'],
		link: 'http://www.infsoc.org/conference/iwin2025/',
	},
	{
		title: '技育CAMP Vol.18',
		time: '2026年1月',
		description: 'AIを活用した献立提案アプリ「Mogu」を開発。AIによるパーソナライズされた料理提案、買い物リスト自動生成、調理ガイド機能を実装。Flutter/DartによるiOS/Androidのフロントエンド開発からFirebaseを用いたバックエンド構築まで横断的に開発に携わりました。',
		tags: ['最優秀賞'],
		link: 'https://x.com/geek_pjt/status/2012813371779715109',
	},
	{
		title: 'GMOインターネット株式会社 kitaQサマーインターン',
		time: '2024年8月',
		description: 'ハッカソンにてUI/UXを改善し初心者にもVPSを使いやすくするコンパネの改善案を提案・開発し、最優秀賞を受賞しました。',
		tags: ['最優秀賞'],
	},
];
