const expect = require('chai').expect;
const request = require('request');
//require = '../src/js/Game.js'

it('Main page loaded', function (done) {
    request('http://localhost:3001', function (error, response, body){
        expect(response.statusCode).to.equal(200);
        done();
    })

});


