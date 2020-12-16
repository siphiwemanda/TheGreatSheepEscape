import { Game} from './js/Game.js'


window.onload = async function (){

    const canvas = document.getElementById('sheepEscape')
    // Game object
    await  Game(canvas, 1)


}