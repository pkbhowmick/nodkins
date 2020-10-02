const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../src/index')

chai.use(chaiHttp)

describe('/GET task',()=>{
    it('It should GET all the tasks', (done)=>{
        chai.request(server)
        .get('/api/tasks')
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('array');
        done();
        })
    })
})