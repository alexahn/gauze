import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

class GauzeTerminal {
	// note: config takes the command argv structure (src/command/commands/run/terminal.js)
	constructor({ $gauze }, config) {
		this.$gauze = $gauze;
		this.config = config;

		// note: the repl seems to be hijacking ctrl+c (the sigint signal is never caught here)

		process.on("SIGINT", function (val) {
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGINT: ${val}`);
			process.exit(130);
		});

		process.on("SIGTERM", function (val) {
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGTERM: ${val}`);
			// https://tldp.org/LDP/abs/html/exitcodes.html
			// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
			// in this case SIGTERM is 15 so we have 128 + 15
			process.exit(143);
		});

		// this is called once the exit trajectory has been set
		process.on("exit", function (val) {
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.exit: ${val}`);
		});
	}
	create_graphql_shell(schema, database) {
		return function (operation, operation_name, operation_variables) {
			return $gauze.kernel.shell.graphql
				.TRANSACTION_EXECUTE__GRAPHQL__SHELL__KERNEL(database, {
					schema,
					operation,
					operation_name,
					operation_variables,
				})
				.then(function (data) {
					return data.data;
				});
		};
	}
	start() {
		const SHELL = this.$gauze.kernel.shell.node.SHELL__NODE__SHELL__KERNEL.start();
		// todo: maybe separate the modules from the added keys here
		// todo: gauze vs $gauze?
		SHELL.context.$gauze = this.$gauze;
		SHELL.context.gauze = {};
		SHELL.context.gauze.database = this.$gauze.database.knex.create_connection();
		SHELL.context.gauze.modules = this.$gauze;
		SHELL.context.gauze.execute_database_graphql = this.create_graphql_shell(
			this.$gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
			SHELL.context.gauze.database,
		);
		SHELL.context.gauze.execute_system_graphql = this.create_graphql_shell(
			this.$gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
			SHELL.context.gauze.database,
		);
		SHELL.context.gauze._description = {
			database: "A Knex database connection",
			modules: "The gauze root module (src/index.js)",
			execute_database_graphql:
				"A function that accepts an operation, operation_name, and operation_variables that executes the combination against the database graphql interface",
			execute_system_graphq: "A function that accepts an operation, operation_name, and operation_variables that executes the combination against the system graphql interface",
		};
		// for convenience expose the execute methods to the root shell object
		SHELL.context.execute_database_graphql = SHELL.context.gauze.execute_database_graphql;
		SHELL.context.execute_system_graphql = SHELL.context.gauze.execute_system_graphql;
		console.log("Type gauze to explore");
		SHELL.displayPrompt();
		return SHELL;
	}
}

const GAUZE__TERMINAL__APPLICATION__KERNEL = function (modules, argv) {
	return new GauzeTerminal(modules, argv);
};

export { GAUZE__TERMINAL__APPLICATION__KERNEL };
