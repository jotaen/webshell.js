#!/bin/bash

readonly NODE_IMAGE='node:18.12.1-bullseye'

run::dev-env() {
	docker run \
		--rm \
		-it \
		--volume "$(pwd):/app" \
		--workdir /app \
		--entrypoint /bin/bash \
		"${NODE_IMAGE}"
}

run::install() {
	npm install
}

run::test() {
	./node_modules/.bin/mocha \
		--recursive \
		test
}

run::build() {
	mkdir -p dist/
	./node_modules/.bin/browserify \
		src/view/browser.js \
		--standalone createWebshell \
		--plugin licensify \
		--outfile dist/webshell.js
}
