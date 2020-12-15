import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

import {Game, addTreasure} from '../src/js/Game.js'


describe('#Game()', function () {

    it('should return something fun ', function () {
    expect(addTreasure().to.has('number'))
    })

})

