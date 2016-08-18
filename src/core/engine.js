'use strict'

const createStore = require('redux').createStore
const action = require('../actions')
const createBuffer = require('../buffer')
const parse = require('./parse')
const render = require('./render.js')
const filesystem = require('../filesystem.js')
const makePathFromString = require('../makePathFromString.js')
const tokenize = require('./tokenize')

module.exports = (commands, reducers, initialState) => {
  const store = createStore(reducers, initialState)

  const findExec = (commands, commandName) => {
    if (commands[commandName]) {
      return commands[commandName]
    } else if (commandName !== undefined) {
      return () => { throw new Error('Command not found') }
    } else {
      return () => {}
    }
  }

  const makeArgs = (previous, job) => {
    let args = job.args
    if (job.wantsInput) {
      const plainTextOutput = previous.output.reduce((result, output) => {
        return (result + render(output))
      }, '')
      args.push(plainTextOutput)
    }
    return args
  }

  const process = (previous, job) => {
    if (previous.error && job.stopOnFailure) return previous
    const buffer = createBuffer()
    const frozenState = Object.freeze(store.getState())
    const execute = findExec(commands, job.command)

    try {
      const args = makeArgs(previous, job)
      execute(args, buffer.print, frozenState, store.dispatch)
      return {error: false, output: buffer.get()}
    } catch (e) {
      return {error: true, output: [job.command + ': ' + e.message]}
    }
  }

  const evaluate = (line) => {
    store.dispatch(action.activity())
    store.dispatch(action.saveInput(line))
    const queue = parse(line)
    const result = queue.reduce(process, {error: false, output: ['']})

    return {
      output: result.output,
      state: Object.freeze(store.getState())
    }
  }

  const state = () => {
    return Object.freeze(store.getState())
  }

  const complete = (line) => {
    const parts = tokenize(line).map(token => token.content)
    const last = parts.pop()
    const tree = store.getState().fileTree
    const location = store.getState().currentLocation
    const path = makePathFromString(last, location)
    if (last.slice(-1) === '/') path.push('')
    const partial = path.pop()
    const result = filesystem.find(tree, path)
    if (!result) return []
    return Object.keys(result).filter((item) => {
      return (item.indexOf(partial) === 0)
    }).map((item) => {
      let p = ''
      const absolutePath = path.join('/')
      if (absolutePath.length > 0) p += '/' + absolutePath
      p += '/' + item + '/'
      return {
        preceding: parts.join(' '),
        partial: p
      }
    })
  }

  return {
    evaluate,
    state,
    complete
  }
}
