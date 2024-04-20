import repl from 'repl'

class NodeShell {
	start () {
		const REPL = repl.start('> ')
		// augment REPL.context here
		return REPL
	}
}

const NODE_SHELL_KERNEL = new NodeShell()

export {
	NODE_SHELL_KERNEL
}