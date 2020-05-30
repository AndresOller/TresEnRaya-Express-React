// Test of GameController
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
var server = require('../src/index');

chai.use(chaiHttp);


describe('Status', function() {
  it('Devolver error al enviar tablero diferente a 9 casillas', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          ""
        ]
      })
      .end(function(err, res){
        res.should.have.status(400);
        done();
      });
  });
  it('Devolver error al no enviar nada', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .end(function(err, res){
        res.should.have.status(400);
        done();
      });
  });
  it('Devolver error al no enviar array en board', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": "test"
      })
      .end(function(err, res){
        res.should.have.status(400);
        done();
      });
  });
  it('Devolver error al no enviar la propiedad board', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "test": "test"
      })
      .end(function(err, res){
        res.should.have.status(400);
        done();
      });
  });
  it('Devolver propiedad winner', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          "X","O","X",
          "X","","X",
          "O","X","X"
        ]
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.status.should.have.property('winner');
        done();
      });
  });
  it('Devolver propiedad winner X si jugador X gana', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          "X","O","X",
          "X","","X",
          "O","X","X"
        ]
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.status.winner.should.equal('X');
        done();
      });
  });
  it('Devolver propiedad winner O si jugador O gana', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          "X","O","O",
          "X","","O",
          "O","X","O"
        ]
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.status.winner.should.equal('O');
        done();
      });
  });
  it('Devolver propiedad winner null si no hay jugador ganador', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          "X","O","O",
          "X","","",
          "O","X","O"
        ]
      })
      .end(function(err, res){
        res.should.have.status(200);
        should.not.exist(res.body.status.winner);
        done();
      });
  });
  it('Devolver propiedad endGame', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          "X","O","X",
          "X","","X",
          "O","X","X"
        ]
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.status.should.have.property('endGame');
        done();
      });
  });
  it('Devolver endGame true si ha ganado un jugador', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          "X","O","X",
          "X","","X",
          "O","X","X"
        ]
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.status.endGame.should.equal(true);
        done();
      });
  });
  it('Devolver endGame true si tablero está lleno', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          "X","O","X",
          "X","O","O",
          "O","X","X"
        ]
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.status.endGame.should.equal(true);
        done();
      });
  });
  it('Devolver endGame false si tablero no está lleno y no ha ganado ningún jugador', function(done) {
    chai.request(server)
      .post('/api/game/status')
      .send({
        "board": [
          "X","O","X",
          "X","","O",
          "O","X","X"
        ]
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.body.status.endGame.should.equal(false);
        done();
      });
  });

});

describe('Status', function() {
  // TODO
});