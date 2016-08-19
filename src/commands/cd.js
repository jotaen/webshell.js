'use strict'

const makePathFromString = require('../makePathFromString')
const action = require('../actions')

exports.help = ({
  description: 'Change the current working directory',
  usage: 'cd [directory]'
})

exports.main = (args, print, state, dispatch) => {
  const currentLocation = state.currentLocation
  const path = makePathFromString(args[0], currentLocation)
  dispatch(action.changeLocation(path))
}
