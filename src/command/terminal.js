import {
	config
} from 'dotenv'
import findConfig from 'find-config'

config({
	path: findConfig('.env')
})

import * as $gauze from './../index.js'

const SHELL = $gauze.kernel.shell.node.NODE_SHELL_KERNEL.start()

SHELL.context.gauze = $gauze