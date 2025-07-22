import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import fs from "fs";

import * as esbuild from "esbuild";

const ALLOWED_PROCESS_ENV = ["GAUZE_PROTOCOL", "GAUZE_HOST", "GAUZE_PORT", "GAUZE_DEBUG_UI"];

function filterVariables(env) {
	const filtered = {};
	Object.keys(env)
		.filter(function (variable) {
			return 0 <= ALLOWED_PROCESS_ENV.indexOf(variable);
		})
		.forEach(function (variable) {
			filtered[variable] = env[variable];
		});
	return filtered;
}

let envPlugin = {
	name: "env",
	setup(build) {
		// Intercept import paths called "env" so esbuild doesn't attempt
		// to map them to a file system location. Tag them with the "env-ns"
		// namespace to reserve them for this plugin.
		build.onResolve({ filter: /^env$/ }, (args) => ({
			path: args.path,
			namespace: "env-ns",
		}));

		// Load paths tagged with the "env-ns" namespace and behave as if
		// they point to a JSON file containing the environment variables.
		build.onLoad({ filter: /.*/, namespace: "env-ns" }, () => ({
			contents: JSON.stringify(filterVariables(process.env)),
			loader: "json",
		}));
	},
};

const result = await esbuild.build({
	entryPoints: ["src/views/gauze/src/index.jsx"],
	bundle: true,
	minify: true,
	sourcemap: true,
	metafile: true,
	loader: {
		".svg": "dataurl",
	},
	outfile: "./src/views/gauze/build/index.js",
	plugins: [envPlugin],
});

if (result.metafile) {
	// use https://bundle-buddy.com/esbuild to analyses
	fs.writeFileSync("./metafile.json", JSON.stringify(result.metafile));
}
