//database basic
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults for lowdb (required if your JSON file is empty)
db.defaults({ users: [], sessions: [] }).write()

module.exports= db