#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import * as create from "./commands/create/index.js";
import * as run from "./commands/run/index.js";

yargs(hideBin(process.argv)).command(create).command(run).demandCommand().help().parse();
//.wrap(128)
