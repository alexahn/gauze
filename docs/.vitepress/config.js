export default {
	title: "Gauze",
	description: "Gauze is a structured GraphQL framework",
	themeConfig: {
		nav: [
			{ text: "Quick Start", link: "/getting-started" },
			{ text: "Entities", link: "/entities" },
			{ text: "API", link: "/runtime-and-graphql" },
			{ text: "Development", link: "/development/source-layout" },
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
				text: "Entity",
				items: [
					{ text: "Create a Definition", link: "/entity-definition" },
					{ text: "Create a Migration", link: "/create-a-migration" },
					{ text: "Generate Project Code", link: "/entities" },
					{ text: "Article Entity Tutorial", link: "/article-entity-tutorial" },
				],
			},
			{
				text: "Authentication and Authorization",
				items: [
					{ text: "Overview", link: "/authentication-and-authorization" },
					{ text: "Project Configuration", link: "/project-configuration" },
					{ text: "Environment Realm", link: "/environment-realm" },
					{ text: "Email Code Tutorial", link: "/email-code-tutorial" },
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
