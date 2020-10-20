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
})