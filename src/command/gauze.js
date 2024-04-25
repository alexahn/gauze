#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import * as run from "./commands/run/index.js";

yargs(hideBin(process.argv)).command(run).demandCommand().help().parse();
//.wrap(128)
