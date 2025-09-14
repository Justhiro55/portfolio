export const profile = {
	fullName: 'Hiromichi Hagiwara',
	title: '',
	institute: 'Graduate Student at Future University Hakodate / 42Tokyo',
	author_name: 'Hiromichi Hagiwara',
	research_areas: [
		{ title: 'Network Security', description: 'TCPを標的とした最適化したDoS攻撃手法の研究', field: 'computer-science' },
		{ title: 'Web Development', description: 'フルスタック開発', field: 'software-engineering' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: '',
	linkedin: 'https://www.linkedin.com/in/hiromichi-hagiwara-28b071279/',
	x: 'https://x.com/____beatnik',
	github: 'https://github.com/Justhiro55',
	gitlab: '',
	scholar: '',
	inspire: '',
	arxiv: '',
	orcid: '',
}

export const template = {
	website_url: 'https://luminous-sundae-8d31f1.netlify.app/', // Astro needs to know your site's deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: 'light', // Select one of the Daisy UI Themes or create your own
	darkTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
    base: '/' // Repository name starting with /
}

export const seo = {
	default_title: 'Hiromichi Hagiwara - Portfolio',
	default_description: 'Graduate Student at Future University Hakodate and 42Tokyo. Engaged in research on network security and in web application development.',
	default_image: '/images/astro-academia.png',
}
