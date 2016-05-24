process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../app');
var knex = require('../db/knex');



chai.use(chaiHttp);

describe('API Routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback()
        .then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run()
                .then(function() {
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback()
        .then(function() {
            done();
        });
    });

    describe('GET /api/v1/conversations', function() {
        it('should return all conversations', function(done) {
            chai.request(server)
            .get('/api/v1/conversations')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Welcome');
                res.body[0].messages.length.should.equal(10);
                done();
            });
        });
    });
});
