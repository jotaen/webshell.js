.PHONY: test dist

node_image = node:12.14.0-alpine

node_modules: 
	docker run --rm \
		-v $$(pwd):/app \
		-w /app \
		$(node_image) \
		npm i

test: node_modules
	docker run --rm \
		-v $$(pwd):/app \
		-w /app \
		$(node_image) \
		./node_modules/.bin/mocha

dist: node_modules
	mkdir -p dist
	docker run --rm \
		-v $$(pwd):/app \
		-w /app \
		$(node_image) \
		./node_modules/.bin/browserify \
			src/view/browser.js \
			--s createWebshell \
			-p licensify \
			-o dist/webshell.js
	cp themes/base.css dist/webshell.css

release: dist
	cp dist/webshell.js dist/webshell-$$(md5sum dist/webshell.js | cut -c 1-10).js
	cp dist/webshell.css dist/webshell-$$(md5sum dist/webshell.css | cut -c 1-10).css
