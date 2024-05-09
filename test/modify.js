import fs from "node:fs/promises"
import path from "path"

const files = process.argv.slice(2)
console.log('files', files)

function process_file(file) {
	const file_path = path.resolve(process.cwd(), file)
	console.log('file_path', file_path)
	return fs.readFile(file_path, { encoding: "utf8" }).then(function (content) {
		console.log(replace(content))
		const replaced = replace(content)
		return fs.writeFile(file_path, replaced, { encoding: "utf8" })
	})
}

function replace (content) {
	//return content.replace(/const context = {\n\tagent_id: \("\.\*\?"\)\n}/g, 'const context=\n\tagent: {\n\t\tagent_id: $1\n\t}\n}')
	//return content.replace(/const\ context = {\n\tagent_id: "(.*)",\n};/g, 'const context = {\n\tagent: {\n\t\tagent_id: "$1",\n\t}\n};')
	return content.replace(/const\ context = {\n\tagent_id: "(.*)",\n};/g, 'const context = {\n\tagent: {\n\t\tagent_id: "$1",\n\t\tagent_type: "gauze__agent_user"\n\t}\n};')
}

Promise.all(files.map(function (file) {
	return process_file(file)
})).then(function (results) {
	console.log('results', results)
})
