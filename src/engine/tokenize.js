'use strict'

const stringLiteral = /^"((?:\\\s|\\"|\\\\|[^"\\])*)"/
const operator = /^(&&|&|\||>>|>)/
const symbol = /^(\\\s|[^\s])+/

module.exports = (statement) => {
  let remaining = statement
  let tokenList = []
  while(remaining.length > 0) {
    remaining = remaining.trim()
    if (stringLiteral.test(remaining)) {
      const matchResult = remaining.match(stringLiteral)
      const completeMatch = matchResult[0]
      const stringContent = matchResult[1].replace(/\\"/g, '"')
      tokenList.push({
        kind: 'string',
        content: stringContent
      })
      remaining = remaining.substr(completeMatch.length)
    } else if (operator.test(remaining)) {
      const operatorName = remaining.match(operator)[0]
      tokenList.push({
        kind: 'operator',
        content: operatorName
      })
      remaining = remaining.substr(operatorName.length)
    } else if (symbol.test(remaining)) {
      const symbolName = remaining.match(symbol)[0]
      tokenList.push({
        kind: 'symbol',
        content: symbolName.replace(/\\ /g, ' ')
      })
      remaining = remaining.substr(symbolName.length)
    } else {
      throw new Error('Invalid input sequence: ' + remaining)
    }
  }
  return tokenList
}
