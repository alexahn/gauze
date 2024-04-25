#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv)).command(create).command(run).demandCommand().help().parse();
//.wrap(128)
