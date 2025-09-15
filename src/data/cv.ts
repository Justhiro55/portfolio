export const experiences = [
	{
		company: '株式会社HERP',
		time: '2025年5月 - 現在',
		title: 'Internship',
		location: 'Tokyo, Japan',
		description: 'Webアプリケーション開発',
	},
	{
		company: '42Tokyo',
		time: '2023年5月 - 現在',
		title: 'First Circle',
		location: 'Tokyo, Japan',
		description: '体系的にコンピューターサイエンスの基礎から学んでいます。bashの再実装、グラフィックの課題など幅広い課題に取り組んでいます。',
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
		school: '公立はこだて未来大学大学院',
		time: '2023年4月 - 2026年3月',
		degree: '博士前期課程 情報アーキテクチャ領域',
		location: 'Hokkaido, Japan',
		description: 'MPTCP(Multipath TCP)に関するネットワークセキュリティ研究を行っています。学部時の研究を発展させ、TCPを標的とする最適化したDoS攻撃手法について研究しています。',
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
		authors: '萩原 啓道, 稲村 浩, 石田 繁巳',
		journal: 'pub.confit.atlas.jp',
		time: '2024年9月',
		link: 'https://pub.confit.atlas.jp/ja/event/society2024/presentation/A-7-02',
		abstract: 'Optimistic ACKing機能を悪用したLDoS攻撃の効果を検証し、その脅威レベルと対策について分析を行いました。',
	},
];
