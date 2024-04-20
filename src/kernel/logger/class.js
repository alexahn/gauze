// LOG_LEVEL_MINIMUM
// LOG_LEVEL_MAXIMUM
// LOG_LEVEL_REGEX, LOG_TOPIC_REGEX, LOG_MESSAGE_REGEX

import util from 'util'
import path from 'path'
import url from 'url'
import {
	fileURLToPath
} from 'url';

class Logger {
	constructor ({
		LOG_LEVEL_MINIMUM,
		LOG_LEVEL_MAXIMUM,
		LOG_LEVEL_REGEX,
		LOG_TOPIC_REGEX,
		LOG_MESSAGE_REGEX
	}) {
		this.LOG_LEVEL_MINIMUM = LOG_LEVEL_MINIMUM
		this.LOG_LEVEL_MAXIMUM = LOG_LEVEL_MAXIMUM
		this.LOG_LEVEL_REGEX = LOG_LEVEL_REGEX
		this.LOG_TOPIC_REGEX = LOG_TOPIC_REGEX
		this.LOG_MESSAGE_REGEX = LOG_MESSAGE_REGEX
		this.STDOUT_LEVEL_MINIMUM = '0'
		this.STDOUT_LEVEL_MAXIMUM = '4'
		this.STDERR_LEVEL_MINIMUM = '4'
		this.STDERR_LEVEL_MAXIMUM = '8'
	}
}

class IOLogger extends Logger {
	constructor (config) {
		super(config)
	}
	write (level, topic, ...messages) {
		const self = this
		if (this.LOG_LEVEL_MINIMUM <= level && level <= this.LOG_LEVEL_MAXIMUM) {
			if (this.LOG_LEVEL_REGEX) {
				// return if regex doesn't match
				const LEVEL_REGEX = new RegExp(this.LOG_LEVEL_REGEX)
				const VALID_LEVEL = LEVEL_REGEX.test(level)
				if (!VALID_LEVEL) return false
			}
			if (this.LOG_TOPIC_REGEX) {
				const TOPIC_REGEX = new RegExp(this.LOG_TOPIC_REGEX)
				const VALID_TOPIC = TOPIC_REGEX.test(topic)
				if (!VALID_TOPIC) return false
			}
			if (this.LOG_MESSAGE_REGEX) {
				const MESSAGE_REGEX = new RegExp(this.LOG_MESSAGE_REGEX)
				const VALID_MESSAGE = MESSAGE_REGEX.test(message)
				if (!VALID_MESSAGE) return false
			}
			const stack = []
			messages.forEach(function (message) {
				self.process_input(level, topic, stack, message)
			})
			return true
		}
	}
	process_input (level, topic, stack, input) {
		// split the message by new lines
		var last_line
		const MESSAGE_STRING = util.inspect(input, {
			colors: false
		})
		const MESSAGE_LINES = []
		// note: seems like console.log does some nice thing around logging output from JSON.stringify
		// note: we need to escape \\n instead of \n for output from JSON.stringify
		// note: just brute force this by first splitting by \\n and then splitting by \n
		const FIRST_SPLIT = MESSAGE_STRING.split('\\n')
		FIRST_SPLIT.forEach(function (line_first) {
			const SECOND_SPLIT = line_first.split('\n')
			SECOND_SPLIT.forEach(function (line_second) {
				MESSAGE_LINES.push(line_second)
			})
		})
		const OUTPUT_LINES = MESSAGE_LINES.map(function (line, idx) {
			var parsed_line
			if (idx === 0 && idx === MESSAGE_LINES.length - 1) {
				parsed_line = line.slice(1, line.length - 1)
				last_line = parsed_line
			} else if (idx === 0) {
				parsed_line = line.slice(1)
			} else if (idx === MESSAGE_LINES.length - 1) {
				parsed_line = line.slice(0, line.length - 1)
				last_line = parsed_line
			} else {
				parsed_line = line
			}
			const formatted = `level:${level} topic:${topic} message: ${stack.length ? stack.join(' ') + ' ' : ''}${parsed_line}`
			return formatted
		})
		stack.push(last_line)
		this.write_lines(level, OUTPUT_LINES)
	}
	write_lines (level, lines) {
		if (this.STDOUT_LEVEL_MINIMUM < level && level < this.STDOUT_LEVEL_MAXIMUM) {
			lines.forEach(function (line, idx) {
				console.log(line)
			})
		} else if (this.STDERR_LEVEL_MINIMUM < level && level < this.STDERR_LEVEL_MAXIMUM) {
			lines.forEach(function (line) {
				console.err(line)
			})
		}
	}
}

export {
	Logger,
	IOLogger
}