export default {
	title: "Gauze",
	base: "/gauze/",
	description: "Gauze is a structured GraphQL framework",
	themeConfig: {
		logo: "/logo.svg",
		nav: [
			{ text: "Quick Start", link: "/getting-started" },
			{ text: "Entities", link: "/entity/definition" },
			{ text: "API", link: "/runtime-and-graphql" },
			{ text: "Development", link: "/development/source-layout" },
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/alexahn/gauze" },
		],
		sidebar: [
			{
				text: "Start Here",
				items: [
					{ text: "Overview", link: "/" },
					{ text: "Quick Start", link: "/getting-started" },
					{ text: "Generated Project", link: "/project-layout" },
					{ text: "HTTP & GraphQL", link: "/runtime-and-graphql" },
					{ text: "Database Setup", link: "/database-and-sharding" },
				],
			},
			{
				text: "Project",
				items: [
					{ text: "Overview", link: "/project/overview" },
					{ text: "Configuration", link: "/project/configuration" },
				],
			},
			{
				text: "Database",
				items: [
					{ text: "Overview", link: "/database/overview" },
					{ text: "Configuration", link: "/database/configuration" },
					{ text: "Sharding", link: "/database/sharding" },
				],
			},
			{
				text: "Entity",
				items: [
					{ text: "Create a Definition", link: "/entity/definition" },
					{ text: "Create a Migration", link: "/entity/create-a-migration" },
					{ text: "Generate Project Code", link: "/entity/generate-project-code" },
					{ text: "Article Entity Tutorial", link: "/entity/article-entity-tutorial" },
				],
			},
			{
				text: "Authentication and Authorization",
				items: [
					{ text: "Overview", link: "/authentication-and-authorization/overview" },
					{ text: "Project Configuration", link: "/authentication-and-authorization/project-configuration" },
					{ text: "Environment Realm", link: "/authentication-and-authorization/environment-realm" },
					{ text: "Email Code Tutorial", link: "/authentication-and-authorization/email-code-tutorial" },
				],
			},
			{
				text: "Development",
				items: [
					{ text: "Framework Source", link: "/development/source-layout" },
				],
			},
		],
	},
};
