# will run the js-beautify command over all .js files in the src directory
format:
	#find ./src -name "*.js" -exec ./node_modules/.bin/js-beautify -f {} -r --config ./format.json \;
	#find ./test -name "*.js" -exec ./node_modules/.bin/js-beautify -f {} -r --config ./format.json \;
	npx prettier package.json --write
	npx prettier src --write
	npx prettier test --write
