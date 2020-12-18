import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

import {CollisionFencevsSheep, fruitCollision} from '../src/js/Game.js'

let fence =[{
    src: "../img/Attributes/FenceVertical.png",
    x: 100,
    y: 200
}]
let fruit = [{
    src: "../img/Attributes/FenceVertical.png",
    x: 200,
    y: 200,
}]
describe('#Collisions()', function () {

    it('should check that they where no sheep/fence collision', function () {
        expect(CollisionFencevsSheep(500,400,fence)).to.be.true
    });
    it('should check that they was a sheep/fence collision', function () {
        expect(CollisionFencevsSheep(100,200,fence)).to.be.false
    });
    it('should check that the sheep was in the bounds of the game', function () {
        expect(CollisionFencevsSheep(400,400,fence)).to.be.true
    });
    it('should check the sheep was outside the bounds of the game', function () {
        expect(CollisionFencevsSheep(1300,0,fence)).to.be.false
    });
    it('should check that they was a fruit collision and return 0', function () {
        assert.isNumber(fruitCollision(200,200,fruit), "0")
    });
    it('should check that they was not a fruit collision and return -1', function () {
        assert.isNumber(fruitCollision(600,600,fruit), "-1")
    });
})


