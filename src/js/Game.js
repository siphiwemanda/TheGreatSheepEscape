import {Sheep} from './Sheep.js'
import {Background} from './Background.js'
import {LoadScreen} from './LoadScreen.js'
import {EndGame} from './EndGame.js'
import {FenceFactory} from './FenceFactory.js'
import {GameScore} from './GameScore.js'

export async function Game(canvas, state) {
    const game = Game;
    console.log(canvas)

    game.canvas = canvas;
    game.context = game.canvas.getContext('2d')

    game.state = state

    if (game.state === 1) {
        return await LoadGame(canvas, state)
    }
    if (game.state === 2) {
        await StartGame(canvas, game.context)
    }
    if (game.state === 3) {
        //EndGame()
    }

}

// controls the loop the game is currently in
function GameLoop(CurrentState) {
    switch (CurrentState) {
        case 1:
            //draw opening screen
            break;
        case 2:
            //draw playing screen
            break;
        case 3:
            //draw ending screen]
            break;

    }
}

async function LoadGame(canvas, state) {
    const start = new LoadScreen(canvas)
    console.log(start)
    console.log(state)
    await start.Draw()
    await start.Drawblack()
    await start.Drawwhite()
    await start.Drawyellow()
    const score = new GameScore(canvas)
    score.Draw()
    window.addEventListener('click', function (event) {
        console.log('click')
        console.log(event)
        state = 2
        console.log(state)
        Game(canvas, state)

    })
}

async function StartGame(canvas, context) {
    const background = new Background(canvas)
    const sheep = new Sheep(canvas)
    const fences = await getFences(canvas)
    console.log(fences)
    await GameEngine(canvas, context, fences, background, sheep)
}

function endGame() {

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

async function GameEngine(canvas, context, fences, background, sheep) {
    window.requestAnimationFrame(animationLoop)

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
            sheep.DrawTile(counter)
        }
        window.requestAnimationFrame(animationLoop)

    }

    window.addEventListener("keydown", function (event) {
        if (event.code === "ArrowUp") {
            console.log(event.code)
            while (CollisionCheck(sheep.x, sheep.y))

            sheep.y = sheep.y - 5
        }
        if (event.code === "ArrowDown") {
            console.log(event.code)
            sheep.y = sheep.y + 5

        }
        if (event.code === "ArrowRight") {
            console.log(event.code)
            do{
                sheep.x = sheep.x + 5
            }
            while (CollisionCheck(sheep.x, sheep.y))




        }
        if (event.code === "ArrowLeft") {
            console.log(event.code)
            sheep.x = sheep.x - 5

        }
    })

}

function CollisionCheck(sheepX, sheepY) {
    let screenEdge = false
    let noColision = true
    const rightEdge = 1200 - 140;
    const leftEdge = 140;

    if (sheepX <= leftEdge || sheepX >= rightEdge) {

        console.log(sheepX)
        screenEdge = true;
        console.log(screenEdge)
        noColision = false
        return noColision

    } else {
        screenEdge = false
        return noColision
    }


}

