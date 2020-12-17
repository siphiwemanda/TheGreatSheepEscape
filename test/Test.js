import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

import {CollisionCheck, Game} from '../src/js/Game.js'
import {generateRandomNumber, generateRandomNumberMaxThree} from "../src/js/utils.js";
import {addFruit} from "../src/js/ObjectData.js";

let fence =[{
    src: "../img/Attributes/FenceVertical.png",
    x: 100,
    y: 200
}]
let fruit = [{
    x: 600,
    y: 600,
}]


describe('#Game()', function () {


    it('should check that they where no sheep/fence collision', function () {
        expect(CollisionCheck(500,400,fence)).to.be.true
    });
    it('should check that they was a sheep/fence collision', function () {
        expect(CollisionCheck(100,200,fence)).to.be.false
    });
    it('should check that they was no sheep/treasure collision', function () {
        expect(CollisionCheck(300,300,fence)).to.be.true
    });
    it('should check that they was a sheep/treasure collision', function () {
        expect(CollisionCheck(600,600,fence)).to.be.true
    });
})



/*describe("GameClass", () =>{
    const gameClass = new Game(canvas, fence, fruit)
    it('should do something we hope ', function () {
        expect(gameclass.start()).to.be.true
    });

})*/

