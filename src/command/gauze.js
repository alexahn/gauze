#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import * as create from "./commands/create/index.js";
import * as read from "./commands/read/index.js";
import * as del from "./commands/delete/index.js";
import * as run from "./commands/run/index.js";
import * as project from "./commands/project.js";
import * as migrate from "./commands/migrate/index.js";
import * as seed from "./commands/seed/index.js";

yargs(hideBin(process.argv)).command(create).command(read).command(del).command(run).command(migrate).command(seed).command(project).demandCommand().help().parse();
//.wrap(128)
