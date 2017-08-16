const expect = require('chai').expect
const dbContacts = require('../../../src/db/contacts')
const dbHelper = require('../../helpers/db')

describe('Integration Tests', function() {
  beforeEach('truncate and seed the DB before each test', function() {
    return dbHelper.initDB()
  })

  it('#createContact saves a new contact to the db', function() {
    const newContact = { first_name: 'Spencer', last_name: 'Dezart-Smith' }
    return dbContacts.createContact(newContact)
      .then(contact => {
        expect(contact[0].id).to.equal(4)
        expect(contact[0].first_name).to.equal('Spencer')
      })
  })

  it('#getContacts returns all contacts from the db', function() {
    return dbContacts.getContacts()
      .then(contacts => {
        expect(contacts).be.a('array')
        expect(contacts.length).to.equal(3)
        expect(contacts[2].first_name).to.equal('NeEddra')
      })
  })

  it('#getContact returns a single contact from the db', function() {
    return dbContacts.getContact(1)
      .then(contact => {
        expect(contact.id).to.equal(1)
        expect(contact.first_name).to.equal('Jared')
      })
  })

  it('#deleteContact deletes a single contact from the db', function() {
    return dbContacts.deleteContact(1)
      .then(() => {
        return dbContacts.getContacts()
          .then(contacts => {
            expect(contacts.length).to.equal(2)
            expect(contacts[0].id).to.equal(2)
          })
      })
  })

  it('#searchForContact returns an array of entries matching the query', function() {
    return dbContacts.searchForContact('nee')
      .then(contacts => {
        expect(contacts[0].first_name).to.equal('NeEddra')
        expect(contacts).be.a('array')
      })
  })
})
