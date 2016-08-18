'use strict'

const stringLiteral = /^"((?:\\\s|\\"|\\\\|[^"\\])*)"/
const operator = /^(&&|&|\||>>|>)/
const symbol = /^(\\\s|[^\s])+/

module.exports = (statement) => {
  let remain = statement
  let tokenList = []
  while (remain.length > 0) {
    remain = remain.trim()
    if (stringLiteral.test(remain)) {
      const matchResult = remain.match(stringLiteral)
      const completeMatch = matchResult[0]
      const stringContent = matchResult[1].replace(/\\"/g, '"')
      tokenList.push({
        kind: 'string',
        content: stringContent
      })
      remain = remain.substr(completeMatch.length)
    } else if (operator.test(remain)) {
      const operatorName = remain.match(operator)[0]
      tokenList.push({
        kind: 'operator',
        content: operatorName
      })
      remain = remain.substr(operatorName.length)
    } else if (symbol.test(remain)) {
      const symbolName = remain.match(symbol)[0]
      tokenList.push({
        kind: 'symbol',
        content: symbolName.replace(/\\ /g, ' ')
      })
      remain = remain.substr(symbolName.length)
    } else {
      throw new Error('Invalid input sequence: ' + remain)
    }
  }
  return tokenList
}
