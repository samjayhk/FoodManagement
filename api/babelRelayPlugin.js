import babelRelayPlugin from 'babel-relay-plugin'
import schema from './cache/schema.json'

module.exports = babelRelayPlugin(schema.data)