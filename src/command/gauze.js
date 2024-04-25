#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import * as create from "./commands/create/index.js";
import * as run from "./commands/run/index.js";
import * as project from "./commands/project.js";

yargs(hideBin(process.argv)).command(create).command(run).command(project).demandCommand().help().parse();
//.wrap(128)
