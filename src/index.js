//import 'regenerator-runtime/runtime'
import {Game} from './js/Game.js'
import {addFruit, getFences} from './js/ObjectData.js'

window.onload =   async function () {

    const canvas = document.getElementById('sheepEscape')
    // fences are loaded from a json file and need to be passed to the game class
    const createFences = await getFences(canvas)
    // create the fruit
    const createFruit = await addFruit(canvas)
    // Game object receives the canvas and the fences
    const game = new Game(canvas, createFences, createFruit)
    //starts the game loop
    game.start()


}