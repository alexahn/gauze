import fs from "fs";
import path from "path";

if (!process.argv[2]) {
	throw new Error("missing module path argument");
}
if (!process.argv[3]) {
	throw new Error("missing method argument, must be either join or unjoin");
}
if (!process.argv[4]) {
	throw new Error("missing export name argument");
}
if (!process.argv[5]) {
	throw new Error("missing export type argument, must be either directory or file");
}

const MODULE_PATH = process.argv[2];
const METHOD = process.argv[3];
const EXPORT_NAME = process.argv[4];
const EXPORT_TYPE = process.argv[5];

// join and unjoin modules here

function directory_line(name) {
	return `export * as ${name} from "./${name}/index.js"`;
}

function directory_pattern(name) {
	return `export \\* as ${name} from "\\.\\/${name}\\/index\\.js"`;
}

function file_line(name) {
	return `export * as ${name} from "./${name}.js"`;
}

function file_pattern(name) {
	return `export \\* as ${name} from "\\.\\/${name}\\.js"`;
}

function join_module(module_path, source, line) {
	// append to end (exports will be ordered chronologically)
	const SPLIT = source.split("\n");
	if (SPLIT[SPLIT.length - 1] === "" || SPLIT[SPLIT.length - 1] === "\n") {
		SPLIT[SPLIT.length - 1] = line;
	} else {
		SPLIT.push(line);
	}
	return fs.writeFileSync(module_path, SPLIT.join("\n"), { encoding: "utf8" });
}

function join(module_path, name, type) {
	// check to see if it exists
	// only proceed if it does not
	const SOURCE = fs.readFileSync(module_path, { encoding: "utf8" });
	if (type === "directory") {
		const DIRECTORY_PATTERN = new RegExp(directory_pattern(name));
		if (DIRECTORY_PATTERN.test(SOURCE)) {
			// since the function is idempotent, we should just log the information
			console.log(`module ${module_path} could not be joined because ${directory_pattern(name)} exists`);
		} else {
			// join here
			join_module(module_path, SOURCE, directory_line(name));
		}
	} else if (type === "file") {
		const FILE_PATTERN = new RegExp(file_pattern(name));
		if (FILE_PATTERN.test(SOURCE)) {
			// since the function is idempotent, we should just log the information
			console.log(`module ${module_path} could not be joined because ${file_pattern(name)} exists`);
		} else {
			// join here
			join_module(module_path, SOURCE, file_line(name));
		}
	} else {
		console.error("invalid join type");
	}
}

function unjoin_module(module_path, source, line) {
	// remove from anywhere within file
	const SPLIT = source.split("\n");
	const PATTERN = new RegExp(line);
	const FILTERED = SPLIT.filter(function (module_line) {
		return !PATTERN.test(module_line);
	});
	return fs.writeFileSync(module_path, FILTERED.join("\n"), { encoding: "utf8" });
}

function unjoin(module_path, name, type) {
	// check to see if it exists
	// only proceed if it does
	const SOURCE = fs.readFileSync(module_path, { encoding: "utf8" });
	if (type === "directory") {
		const DIRECTORY_PATTERN = new RegExp(directory_pattern(name));
		if (DIRECTORY_PATTERN.test(SOURCE)) {
			unjoin_module(module_path, SOURCE, directory_pattern(name));
		} else {
			console.log(`module ${module_path} could not be unjoined because the export does not exist`);
		}
	} else if (type === "file") {
		const FILE_PATTERN = new RegExp(file_pattern(name));
		if (FILE_PATTERN.test(SOURCE)) {
			unjoin_module(module_path, SOURCE, file_pattern(name));
		} else {
			console.log(`module ${module_path} could not be unjoined because the export does not exist`);
		}
	} else {
		console.error("invalid unjoin type");
	}
}

if (METHOD === "join") {
	join(MODULE_PATH, EXPORT_NAME, EXPORT_TYPE);
} else if (METHOD === "unjoin") {
	unjoin(MODULE_PATH, EXPORT_NAME, EXPORT_TYPE);
} else {
	console.error("invalid method, must be either join or unjoin");
}
