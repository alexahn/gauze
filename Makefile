# will run the js-beautify command over all .js files in the src directory
format:
	find ./src -name "*.js" -exec ./node_modules/.bin/js-beautify -f {} -r --config ./format.json \;


