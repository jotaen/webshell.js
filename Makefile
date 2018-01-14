.PHONY: install build

install:
	docker run --rm \
		-v $$(pwd):/app \
		-w /app \
		node:9.3 \
		npm i

build:
	docker run --rm \
		-v $$(pwd):/app \
		-w /app \
		node:9.3 \
		./node_modules/.bin/browserify \
			src/view/browser.js \
			--s createWebshell \
			-p licensify \
			-o dist/webshell.js \
			-t [ babelify --presets [ es2015-script ] ]

release: build
	cp dist/webshell.js dist/webshell-$(md5sum dist/webshell.js | cut -c 1-10).js
