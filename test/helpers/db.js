const db = require('../../src/db/db')
const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql(file) {
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath)
}

const seedFiles = { contacts: sql('../seed/contacts.sql') }

const truncateTables = () => {
  const tables = ['contacts']
  return Promise.all(tables.map(table => {
    return db.none(`TRUNCATE ${table} RESTART IDENTITY`)
  }))
}

const seedTable = () => {
  return db.none(seedFiles.contacts)
}

const initDB = () => {
  return truncateTables().then(() => {
    return seedTable()
  })
}

module.exports = { initDB }
