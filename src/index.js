"use strict";
import {Game} from './js/Game.js'
import {addFruit, getFences} from './js/ObjectData.js'

window.onload =  function () {
    //THIS GET THE CANVAS FROM THE HTML AFTER THE WINDOW HAS LOADED
    const canvas = document.getElementById('sheepEscape')
    // THIS STARTS THE GAME, AND ADDS A MESSAGE TO THE CONSOLE THAT THE GAME HAS STARTED
    startGame(canvas). then(r => {
        console.log('game loaded in')
    })
}

async function startGame(canvas) {
    //THIS CALLS THE METHOD THAT RETURNS THE INSTANCES OF THE FACTORY CLASS AS FENCES
    const createFences = await getFences(canvas)
    //THIS CALLS THE METHOD THAT RETURNS THE INSTANCES OF THE FACTORY CLASS AS FRUIT
    const createFruit = await addFruit(canvas)
    //THE CREATES AN INSTANCE OF THE GAME CLASS AND PASSES IT OUR CREATED FENCES AND FRUIT
    const game = new Game(canvas, createFences, createFruit)
    //STARTS THE GAME
    game.start()

}

