var body = "";
process.stdin.on("readable", function () {
	var chunk = "";
	while (null !== (chunk = process.stdin.read())) {
		body += chunk;
	}
});
process.stdin.on("end", function () {
	var split = body.split("_");
	split = split.map(function (part) {
		return part[0].toUpperCase() + part.slice(1);
	});
	process.stdout.write(split.join("_"));
});
