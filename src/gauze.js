export default {
	name: "gauze",
	type: "project",
	version: "0.0.1",
	realms: ["./kernel", "./database", "./system", "./environment"],
	process_middlewares: [],
	http_middlewares: [],
	development: {
		admins: [
			{
				name: "Alex Ahn",
				email: "contact@alexahn.com",
				gauze__agent_root: null,
				gauze__agent_account: null,
				gauze__agent_user: "60850dda-0340-49d1-a378-f7313ada2eee x",
				gauze__agent_person: null,
				gauze__agent_character: null,
			},
		],
	},
	staging: {
		admins: [],
	},
	production: {
		admins: [],
	},
	// we need to duplicate these configs (should be the only ones that we need to duplicate)
	realms: {
		kernel: {
			mode: "closed"
		},
		database: {
			mode: "closed"
		},
		system: {
			mode: "closed"
		}
	},
	steps: {
		"steps.account.verify.password": ["steps.person.assert.email.success"],
		"steps.person.assert.email": [] //["steps.account.verify.proof_of_work.success"]
		
	},
	authentication: {
		proxy: ["steps.person.assert.email.success", "steps.account.verify.password.success"],
		realms: {
			kernel: [],
			database: [],
			system: [],
		},
		agents: {
			gauze__agent_root: [], //["steps.account.verify.proof_of_work.success"],
			gauze__agent_account: [],
			gauze__agent_user: [],
			gauze__agent_person: [],
			gauze__agent_character: [],
		},
	},
};
