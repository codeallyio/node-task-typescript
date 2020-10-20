import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import 'mocha'

import server from '../src/server'

const should = chai.should()

chai.use(chaiHttp)

describe('Server HTTP tests', () => {
    describe('GET /', () => {
        it('it should get \'Hello World!\' response', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.text.should.be.a('string').eql('Hello World!')
                    done();
                })
        })
    })

    describe('GET /get-number', () => {
        it('it should receive number between 0 and 99', (done) => {
            chai.request(server)
                .get('/get-number')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('drawn')
                    res.body.drawn.should.be.a('number')
                    done();
                })
        })
    })

    describe('GET /non-valid-endpoint', () => {
        const path = '/non-valid-endpoint'

        it('it should build the response using NOT-FOUND middleware', (done) => {
            chai.request(server)
                .get(path)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status')
                    res.body.status.should.be.a('string').eql('path not found')
                    res.body.should.have.property('path')
                    res.body.path.should.be.a('string').eql(path)
                    done()
                })
        })
    })

    describe('GET /throw-error', () => {
        const path = '/throw-error'

        it('it should return a response with default (500) status code', (done) => {
            chai.request(server)
                .get(path)
                .end((err, res) => {
                    res.should.have.status(500)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status')
                    res.body.status.should.be.a('string').eql('error')
                    res.body.should.have.property('message')
                    res.body.message.should.be.a('string').eql('some error message with default status')
                    res.body.should.have.property('path')
                    res.body.path.should.be.a('string').eql(path)
                    done()
                })
        })
    })

    describe('GET /throw-error-with-status', () => {
        const path = '/throw-error-with-status'

        it('it should return a response with predefined (418) status code', (done) => {
            chai.request(server)
                .get(path)
                .end((err, res) => {
                    res.should.have.status(418)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status')
                    res.body.status.should.be.a('string').eql('error')
                    res.body.should.have.property('message')
                    res.body.message.should.be.a('string').eql('some error message with 418 status')
                    res.body.should.have.property('path')
                    res.body.path.should.be.a('string').eql(path)
                    done()
                })
        })
    })
})