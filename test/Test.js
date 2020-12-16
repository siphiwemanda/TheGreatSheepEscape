import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

import {Game, addTreasure, CollisionCheck} from '../src/js/Game.js'
import {generateRandomNumber, generateRandomNumberMaxThree} from "../src/js/utils.js";

let fence =[]


describe('#Game()', function () {

  /*  it('should return something fun ', (done) => {
        addTreasure(Game.canvas, (sub) => {
            expect(sub).to.be('array')
            done()
        })
    })

    it('assertion success', async () => {
        console.log(Game.canvas)
        const result = await addTreasure(Game.canvas);
        expect(result).to.equal('promise resolved');
    });*/

    it('should return a random number', function () {
        expect(generateRandomNumber()).to.be.a('number')
    });
    it('should return a random number with a maximum of three', function () {
        expect(generateRandomNumberMaxThree()).to.be.a('number')
    });
    it('should check that they where no sheep/fence collision', function () {
        expect(CollisionCheck(100,200,fence)).to.be.true
    });
})
