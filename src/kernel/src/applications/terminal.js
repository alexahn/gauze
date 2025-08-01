import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

class GauzeTerminal {
	// note: config takes the command argv structure (src/command/commands/run/terminal.js)
	constructor({ $gauze }, config) {
		this.$gauze = $gauze;
		this.config = config;

		// note: the repl seems to be hijacking ctrl+c (the sigint signal is never caught here)

		process.on("SIGINT", function (val) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGINT: ${val}`);
			process.exit(130);
		});

		process.on("SIGTERM", function (val) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGTERM: ${val}`);
			// https://tldp.org/LDP/abs/html/exitcodes.html
			// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
			// in this case SIGTERM is 15 so we have 128 + 15
			process.exit(143);
		});

		// this is called once the exit trajectory has been set
		process.on("exit", function (val) {
			$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `process.exit: ${val}`);
		});
	}
	create_graphql_shell(schema, database) {
		return function (operation, operation_name, operation_variables) {
			return $gauze.kernel.src.shell.graphql
				.TRANSACTION_EXECUTE__GRAPHQL__SHELL__SRC__KERNEL(database, {
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
		const shell = this.$gauze.kernel.src.shell.node.SHELL__NODE__SHELL__SRC__KERNEL.start();
		// todo: maybe separate the modules from the added keys here
		// todo: gauze vs $gauze?
		shell.context.$gauze = this.$gauze;
		shell.context.gauze = {};
		shell.context.gauze.database = this.$gauze.database.knex.create_connection();
		shell.context.gauze.modules = this.$gauze;
		shell.context.gauze.execute_database_graphql = this.create_graphql_shell(
			this.$gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
			shell.context.gauze.database,
		);
		shell.context.gauze.execute_system_graphql = this.create_graphql_shell(
			this.$gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
			shell.context.gauze.database,
		);
		shell.context.gauze._description = {
			database: "A Knex database connection",
			modules: "The gauze root module (src/index.js)",
			execute_database_graphql: "A function that accepts an operation, operation_name, and operation_variables that executes the combination against the database graphql interface",
			execute_system_graphq: "A function that accepts an operation, operation_name, and operation_variables that executes the combination against the system graphql interface",
		};
		// for convenience expose the execute methods to the root shell object
		shell.context.execute_database_graphql = shell.context.gauze.execute_database_graphql;
		shell.context.execute_system_graphql = shell.context.gauze.execute_system_graphql;
		console.log("Type gauze to explore");
		shell.displayPrompt();
		return shell;
	}
}

const GAUZE__TERMINAL__APPLICATION__SRC__KERNEL = function (modules, argv) {
	return new GauzeTerminal(modules, argv);
};

export { GAUZE__TERMINAL__APPLICATION__SRC__KERNEL };
