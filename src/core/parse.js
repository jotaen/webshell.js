'use strict'

const tokenize = require('./tokenize')

const createJob = (operator) => {
  const command = {
    command: undefined,
    args: [],
    wantsInput: false,
    stopOnFailure: true
  }
  if (operator === '>') {
    command.command = 'put'
    command.args.push('--overwrite')
    command.wantsInput = true
  } else if (operator === '>>') {
    command.command = 'put'
    command.args.push('--amend')
    command.wantsInput = true
  } else if (operator === '|') {
    command.wantsInput = true
    command.wantsInput = true
  } else if (operator === '&') {
    command.stopOnFailure = false
  } else if (operator === '&&') {
  }
  return command
}

module.exports = (statement) => {
  const tokens = tokenize(statement)
  let queue = []
  const lastJob = tokens.reduce((job, token) => {
    if (token.kind === 'operator') {
      queue.push(job)
      return createJob(token.content)
    }
    if (!job.command) job.command = token.content
    else job.args.push(token.content)
    return job
  }, createJob())
  queue.push(lastJob)
  return queue
}
