import { Game} from './js/Game.js'


window.onload = async function (){

    const canvas = document.getElementById('sheepEscape')
    // Game object
      const game = new Game(canvas)
        await game.start()


}