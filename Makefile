.PHONY: test dist

node_version = 10.5

node_modules: 
	docker run --rm \
		-v $$(pwd):/app \
		-w /app \
		node:$(node_version) \
		npm i

test: node_modules
	docker run --rm \
		-v $$(pwd):/app \
		-w /app \
		node:$(node_version) \
		./node_modules/.bin/mocha

dist: node_modules
	docker run --rm \
		-v $$(pwd):/app \
		-w /app \
		node:$(node_version) \
		./node_modules/.bin/browserify \
			src/view/browser.js \
			--s createWebshell \
			-p licensify \
			-o dist/webshell.js \
			-t [ babelify --presets [ es2015-script ] ]

release: dist
	cp dist/webshell.js dist/webshell-$$(md5sum dist/webshell.js | cut -c 1-10).js
