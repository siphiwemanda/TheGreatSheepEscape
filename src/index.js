//import './regenerator-runtime/runtime'
"use strict";
import {Game} from './js/Game.js'
import {addFruit, getFences} from './js/ObjectData.js'

window.onload =  function () {

    const canvas = document.getElementById('sheepEscape')

    startGame(canvas). then(r => {
        console.log('game loaded in')
    })
}

async function startGame(canvas) {
    // fences are loaded from a json file and need to be passed to the game class
    const createFences = await getFences(canvas)
    // create the fruit
    const createFruit = await addFruit(canvas)
    console.log(createFruit)
    // Game object receives the canvas and the fences
    const game = new Game(canvas, createFences, createFruit)
    //starts the game loop
    game.start()

}

