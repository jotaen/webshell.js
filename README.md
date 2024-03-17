# webshell.js

```
                __         __         ____    _     
 _      _____  / /_  _____/ /_  ___  / / /   (_)____
| | /| / / _ \/ __ \/ ___/ __ \/ _ \/ / /   / / ___/
| |/ |/ /  __/ /_/ (__  ) / / /  __/ / /   / (__  )
|__/|__/\___/_.___/____/_/ /_/\___/_/_(_)_/ /____/  
                                       /___/        
```

webshell.js is a command line interpreter that runs in your browser.

## Live Demo

[Try webshell.js and see it in action](http://static.jotaen.net/webshell.js/example.html)

## Get started

Prerequisites: NodeJS 18+

With [run.sh](https://run.jotaen.net/), do `run::install` and `run::build`. That will create a `dist/` folder, containing a `webshell.js` bundle. `webshell.js` is supposed to be included via a `<script>` tag on a web page. See [the example](example.html) to learn how it is supposed to be used.

## Styling

The webshell outputs nearly bare, unstyled HTML. In order to make it look good you must provide some CSS.

For your convenience, choose one of the [available themes](themes/) and include it via `<style>` or `<link href="">`.
