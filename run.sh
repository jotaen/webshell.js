#!/bin/bash

readonly NODE_IMAGE='node:18.12.1-bullseye'

run::dev-env() {
	docker run \
		--rm \
		--volume "$(pwd):/app" \
		--workdir /app \
		--entrypoint /bin/bash \
		-it \
		"${NODE_IMAGE}"
}

run::install() {
	npm i
}

run::test() {
	./node_modules/.bin/mocha \
		--recursive \
		test
}

run::build() {
	./node_modules/.bin/browserify \
			src/view/browser.js \
			--s createWebshell \
			-p licensify \
			-o dist/webshell.js
	cp themes/base.css dist/webshell.css
}
