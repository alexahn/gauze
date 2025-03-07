var body = "";

if (!process.argv[2]) {
	throw new Error("missing format argument, must be lower_snake_case, lower_kebab_case, pascal_snake_case, or upper_snake_case");
}

// lower snake case
// lower kebab case (file)
// pascal snake case
// upper snake case

function identity(x) {
	return x;
}

process.stdin.on("readable", function () {
	var chunk = "";
	while (null !== (chunk = process.stdin.read())) {
		body += chunk;
	}
});
process.stdin.on("end", function () {
	const format = process.argv[2];
	switch (format) {
		case "lower_snake_case": {
			body = body.replace(" ", "_");
			body = body.replace("-", "_");
			const split = body
				.split("_")
				.map(function (part) {
					return part.toLowerCase();
				})
				.filter(identity);
			process.stdout.write(split.join("_"));
			break;
		}
		case "lower_kebab_case": {
			body = body.replace(" ", "_");
			body = body.replace("_", "-");
			const split = body
				.split("-")
				.map(function (part) {
					return part.toLowerCase();
				})
				.filter(identity);
			process.stdout.write(split.join("-"));
			break;
		}
		case "pascal_case": {
			body = body.replace(" ", "_");
			body = body.replace("-", "_");
			const split = body
				.split("_")
				.map(function (part) {
					if (part.length) {
						return part[0].toUpperCase() + part.slice(1);
					} else {
						return part;
					}
				})
				.filter(identity);
			process.stdout.write(split.join(""));
			break;
		}
		case "pascal_snake_case": {
			body = body.replace(" ", "_");
			body = body.replace("-", "_");
			const split = body
				.split("_")
				.map(function (part) {
					if (part.length) {
						return part[0].toUpperCase() + part.slice(1);
					} else {
						return part;
					}
				})
				.filter(identity);
			process.stdout.write(split.join("_"));
			break;
		}
		case "upper_snake_case": {
			body = body.replace(" ", "_");
			body = body.replace("-", "_");
			const split = body
				.split("_")
				.map(function (part) {
					return part.toUpperCase();
				})
				.filter(identity);
			process.stdout.write(split.join("_"));
			break;
		}
		default:
			throw new Error(`invalid input format: ${format}`);
	}
});
