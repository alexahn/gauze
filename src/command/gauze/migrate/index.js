// sorted alphabetically
import * as current from "./current.js";
import * as down from "./down.js";
import * as list from "./list.js";
import * as make from "./make.js";
import * as run from "./run.js";
import * as rollback from "./rollback.js";
import * as unlock from "./unlock.js";
import * as up from "./up.js";

export const command = "migrate <command>";

export const describe = "Manage gauze migrations";

export const builder = function (yargs) {
	return yargs.command(current).command(down).command(list).command(make).command(run).command(rollback).command(unlock).command(up);
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
