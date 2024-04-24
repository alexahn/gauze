import repl from 'repl'

class NodeShell {
	start () {
		const REPL = repl.start('> ')
		// augment REPL.context here
		return REPL
	}
}

const SHELL__NODE__SHELL__KERNEL = new NodeShell()

export {
	SHELL__NODE__SHELL__KERNEL
}