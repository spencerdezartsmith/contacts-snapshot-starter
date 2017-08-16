const dbHelpers = require('../helpers/db')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../src/server.js')

chai.use(chaiHttp)

describe('Routes', function() {
  beforeEach('truncate tables and seed', function() {
    return dbHelpers.initDB()
  })

  it('GET / should return html and a status code of 200', function(done) {
    chai.request(app)
      .get('/')
      .end(function(error, response) {
        expect(response).to.have.status(200)
        expect(response).to.be.html
        done()
      })
  })

  it('GET /contacts/new should return html a status code of 200', function(done) {
    chai.request(app)
      .get('/contacts/new')
      .end(function(error, response) {
        expect(response).to.have.status(200)
        expect(response).to.be.html
        done()
      })
  })

  it('POST /contacts with correct form data returns a status 200', function(done) {
    chai.request(app)
      .post('/contacts')
      .type('form')
      .send({ first_name: 'Spencer', last_name: 'Dezart-Smith' })
      .end(function(error, response) {
        expect(response).to.have.status(200)
        done()
      })
  })

  it('POST /contacts with incorrect form data returns a status 422', function(done) {
    chai.request(app)
      .post('/contacts')
      .type('form')
      .send({ wrong: 'Spencer', key: 'Dezart-Smith' })
      .end(function(error, response) {
        expect(response).to.have.status(422)
        expect(response.text).to.contain('ERROR: Cannot read property \'id\' of undefined')
        done()
      })
  })

  it('GET /contacts/:contact_id to return a status 200', function(done) {
    chai.request(app)
      .get('/contacts/1')
      .end(function(error, response) {
        expect(response).to.have.status(200)
        expect(response).to.be.html
        done()
      })
  })

  it('DELETE /contacts/:contactId/delete to return status 200', function(done) {
    chai.request(app)
      .get('/contacts/1/delete')
      .end(function(error, response) {
        expect(response).to.have.status(200)
        expect(response).to.be.html
        done()
      })
  })

  it('GET /search to return a status 200', function(done) {
    chai.request(app)
      .get('/contacts/search')
      .query({ q: 'jared' })
      .end(function(error, response) {
        expect(response).to.have.status(200)
        done()
      })
  })
})
