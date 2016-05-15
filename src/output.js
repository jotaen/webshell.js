'use strict';

const styleTag = (hexCode) => {
  return 'style="color:' + hexCode + '"'
}

exports.text = (text, hexCode) => {
  return '<span ' + styleTag(hexCode) + '>' + text + '</span>'
}

exports.startLine = () => {
  return '<div>'
}

exports.endLine = () => {
  return '</div>'
}
