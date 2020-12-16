import {Sheep} from './Sheep.js'
import {Background} from './Background.js'
import {LoadScreen} from './LoadScreen.js'
import {EndGame} from './EndGame.js'
import {FenceFactory} from './FenceFactory.js'
import {HealthScore} from './HealthScore.js'
import {generateRandomNumber, generateRandomNumberMaxThree} from "./utils.js";
import {Carrot} from "./Carrot.js";
import {Pepper} from "./Pepper.js";

export async function Game(canvas, state) {
    const game = Game;
    game.canvas = canvas;
    game.context = game.canvas.getContext('2d')

    game.state = state


    if (game.state === 1) {
        return await LoadGame(canvas, state)
    }
    if (game.state === 2) {
        return await StartGame(canvas, game.context, state)
    }
    if (game.state === 3) {
        await endGame(canvas)
    }

    start()

}

function start () {
    window.webkitRequestAnimationFrame(function () {
        runGameLoop();
    })
}

function runGameLoop() {
    const game = this
    // controls the loop the game is currently in
    if (game.state === 1) {
        //return await LoadGame(canvas, state)

    }
    if (game.state === 2) {
        /*
        return await StartGame(canvas, game.context, state)*/
    }
    if (game.state === 3) {
        // await endGame(canvas)
    }
}

async function LoadGame(canvas, state) {
    const start = new LoadScreen(canvas)
    await start.Draw()
    window.addEventListener('keydown', function (event) {
        if (event.code === "Space"){
            state = 2
            Game(canvas, state)
        }
    })
}

async function StartGame(canvas, context, state) {
    const background = new Background(canvas)
    const sheep = new Sheep(canvas)
    const fences = await getFences(canvas)
    const treasure = await addTreasure(canvas)
    const lives = new HealthScore(canvas)
    await GameEngine(canvas, context, fences, background, sheep, treasure, lives, state)
}

async function endGame(canvas) {

    const end = new EndGame(canvas)
    await end.Draw()

}


export async function getFences(canvas) {
    let fenceObject;

    await fetch("../data/fences.json").then(function (response) {
        return response.json()
    }).then(function (JSONObject) {
        //console.log(JSONObject)
        fenceObject = JSONObject
    }).catch(function (error) {
        console.log('Data failed to load')
        console.log(error)
    })

    const Fences = []
    for (let i = 0; i < fenceObject.Fences.length; i++) {
        let fence = new FenceFactory(canvas)
        fence.x = fenceObject.Fences[i].x
        fence.y = fenceObject.Fences[i].y
        fence.src = fenceObject.Fences[i].src
        Fences.push(fence)
    }
    //console.log(Fences)
    return Fences


}

async function createMaze(canvas, fences) {
    for (let i = 0; i < fences.length; i++) {
        fences[i].DrawTile(fences[i].src, fences[i].x, fences[i].y)
    }
}

export async function addTreasure(canvas) {

    const treasureArray = []
    for (let i = 0; i < generateRandomNumberMaxThree(); i++) {
        let carrot = new Carrot(canvas, generateRandomNumber(), generateRandomNumber())
        let pepper = new Pepper(canvas, generateRandomNumber(), generateRandomNumber())
        treasureArray.push(carrot, pepper)
    }
    //console.log(treasureArray)
    return treasureArray
}

function createTreasure(canvas, treasure) {

    for (let i = 0; i < treasure.length; i++) {
        treasure[i].Draw(treasure[i].x, treasure[i].y)
    }
}

async function GameEngine(canvas, context, fences, background, sheep, treasure, lives, state) {
    window.requestAnimationFrame(animationLoop)
    console.log(state)
    let counter = 0;
    let start = new Date()


    function animationLoop() {

        let now = new Date()
        if (now - start >= 100) {
            start = now
            context.clearRect(0, 0, canvas.width, canvas.height)

            counter++
            counter %= 6

            background.DrawTile()

            createMaze(canvas, fences)

            createTreasure(canvas, treasure)

            lives.Draw()
            sheep.DrawTile(counter)

        }
        window.requestAnimationFrame(animationLoop)

    }


    window.addEventListener("keydown", function (event) {
        if (event.code === "ArrowUp") {
            console.log(event.code)
            let TemporaryY = sheep.y - 5
            if (CollisionCheck(sheep.x, TemporaryY, fences, treasure)) {
                sheep.y = sheep.y - 5
            } else {
                lives.score = lives.score - 1


            }
        }
        if (event.code === "ArrowDown") {
            console.log(event.code)

            let TemporaryY = sheep.y + 5
            if (CollisionCheck(sheep.x, TemporaryY, fences, treasure)) {
                sheep.y = sheep.y + 5
            } else {
                lives.score = lives.score - 1

            }

        }
        if (event.code === "ArrowRight") {
            console.log(event.code)
            let TemporaryX = sheep.x + 5
            if (CollisionCheck(TemporaryX, sheep.y, fences, treasure)) {
                sheep.x = sheep.x + 5

            } else {
                lives.score = lives.score - 1

            }
        }
        if (event.code === "ArrowLeft") {
            console.log(event.code)
            let TemporaryX = sheep.x - 5
            if (CollisionCheck(TemporaryX, sheep.y, fences, treasure)) {
                sheep.x = sheep.x - 5
            } else {
                lives.score = lives.score - 1

            }


        }

    })


}


export function CollisionCheck(sheepX, sheepY, fences, fruits) {
    let noCollision = true
    const rightEdge = 1200 - 45;
    const leftEdge = 0;
    const topEdge = 0
    const bottomEdge = 800 - 45
    fences.forEach(fence => {
            if (fence.src.includes('Vertical') && (sheepX >= fence.x - 32 && sheepX <= fence.x + 32 && sheepY >= fence.y && sheepY <= fence.y + 128)) {
                //console.log(fence.x)
                noCollision = false
                //console.log(noCollision)
            }
        }
    )
    fences.forEach(fence => {
            if (fence.src.includes('Horizontal') && (sheepY >= fence.y - 64 && sheepY <= fence.y + 64 && sheepX + 50 >= fence.x && sheepX + 50 <= fence.x + 128)) {
                //console.log(fence.x)
                noCollision = false
                //console.log(noCollision)
            }
        }
    )
    let fruitCounter = 0
    for (let i = 0; i < fruits.length; i++) {


        if (sheepX >= fruits[i].x && sheepX <= fruits[i].x + 32 && sheepY >= fruits[i].y && sheepY <= fruits[i].y + 32) {
            console.log('nom')
            fruitCounter = fruitCounter + 1
            fruits.splice(fruits[i], 1)

            //noCollision = false
        }
    }

    if (sheepX <= leftEdge || sheepX >= rightEdge) {
        noCollision = false
        return noCollision
    }
    if (sheepY <= topEdge || sheepY >= bottomEdge) {
        noCollision = false
        return noCollision
    } else {
        return noCollision
    }


}



