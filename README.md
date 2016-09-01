# webshell.js

[![Build Status](https://api.travis-ci.org/jotaen/webshell.js.svg)](https://travis-ci.org/jotaen/j4n.io)
[![Coverage Status](https://coveralls.io/repos/github/jotaen/webshell.js/badge.svg?branch=master)](https://coveralls.io/github/jotaen/webshell.js?branch=master)
![Dependencies](https://david-dm.org/jotaen/webshell.js.svg)
[![bitHound Overall Score](https://www.bithound.io/github/jotaen/webshell.js/badges/score.svg)](https://www.bithound.io/github/jotaen/webshell.js)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

```
                __         __         ____    _     
 _      _____  / /_  _____/ /_  ___  / / /   (_)____
| | /| / / _ \/ __ \/ ___/ __ \/ _ \/ / /   / / ___/
| |/ |/ /  __/ /_/ (__  ) / / /  __/ / /   / (__  )
|__/|__/\___/_.___/____/_/ /_/\___/_/_(_)_/ /____/  
                                       /___/        
```

webshell.js is a command line interpreter that runs in your browser.

## Requirements

- NodeJS > 5.0.0

## Install, build

1. Clone the repo
2. Run `npm install`
3. Run `npm run dist`

The build output can be found here: `dist/webshell.js`

## Usage

1. Build the webshell bundle (see above) and include the generated file with a `<script src="">` tag in your webpage.
2. Create an empty `<div>` element with a custom id, e.g.: `<div id="atari"></div>`
3. Call the function `createWebshell()` and pass it the id of the div-element, e.g.: `createWebshell('atari')`

See [the basic example](examples/basic.html).

## Styling

The webshell outputs nearly bare, unstyled HTML. In order to make it look good you must provide some CSS.

For your convenience, choose one of the [available themes](themes/) and include it via `<style>` or `<link href="">`.
