#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import * as create from "./gauze/create/index.js";
import * as read from "./gauze/read/index.js";
import * as del from "./gauze/delete/index.js";
import * as run from "./gauze/run/index.js";
import * as project from "./gauze/project.js";
import * as migrate from "./gauze/migrate/index.js";
import * as seed from "./gauze/seed/index.js";
import * as application from "./application/index.js";

yargs(hideBin(process.argv)).command(create).command(read).command(del).command(run).command(migrate).command(seed).command(project).command(application).demandCommand().help().parse();
//.wrap(128)
