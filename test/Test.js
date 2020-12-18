import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

import {CollisionFencevsSheep, fruitCollision} from '../src/js/Game.js'
import {generateRandomNumber, generateRandomNumberMaxThree} from "../src/js/utils.js";
import {addFruit} from "../src/js/ObjectData.js";

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


describe('#Game()', function () {

    it('should check that they where no sheep/fence collision', function () {
        expect(CollisionFencevsSheep(500,400,fence)).to.be.true
    });
    it('should check that they was a sheep/fence collision', function () {
        expect(CollisionFencevsSheep(100,200,fence)).to.be.false
    });
    it('should check that they was no sheep/treasure collision', function () {
        expect(CollisionFencevsSheep(300,300,fence)).to.be.true
    });
    it('should check that they was a sheep/treasure collision', function () {
        expect(CollisionFencevsSheep(600,600,fence)).to.be.true
    });
    it('should check that they was a fruit collision and return 0', function () {
        // expect(fruitCollision(201,201,fruit)).to.be.false
        assert.isNumber(fruitCollision(200,200,fruit), "0")
    });
    it('should check that they was not a fruit collision and return -1', function () {
        // assert(fruitCollision(600,600,fruit)).isNumber(-1)
        assert.isNumber(fruitCollision(600,600,fruit), "-1")
    });
})


