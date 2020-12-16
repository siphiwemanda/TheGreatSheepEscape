import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

import {Game, addTreasure} from '../src/js/Game.js'
import {generateRandomNumber} from "../src/js/utils.js";




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
})

