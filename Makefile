all: node_modules
	rollup -c

dev: node_modules
	rollup -c rollup.config.dev.mjs

node_modules:
	npm install

clear:
	rm -rf ./dist ./node_modules