import {Sheep} from './Sheep.js'
import {Background} from './Background.js'
import {LoadScreen} from './LoadScreen.js'
import {EndGame} from './EndGame.js'
import {FenceFactory} from './FenceFactory.js'
import {Lives} from './Lives.js'
import {generateRandomNumber, generateRandomNumberMaxThree} from "./utils.js";
import {Carrot} from "./Carrot.js";
import {Pepper} from "./Pepper.js";

const INITIAL = 1;
const GAME_PLAYING = 2;
const GAME_OVER = 3;


export class Game {
    constructor(canvas) {
        const game = Game;
        game.canvas = canvas;
        game.context = game.canvas.getContext('2d')
        game.currentState = INITIAL
        game.addEventListener()
        game.fences = this.fenceArray()
        game.startTime = new Date()
        game.sheepCounter = 0
        game.sheep = new Sheep(game.canvas)
        game.lives = new Lives(game.canvas)

        console.log(game.sheep)
        console.log(game.lives)
    }
    async getFences() {
        const game = this;
        let fenceObject;
        console.log(game.canvas)
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

            let fence = new FenceFactory(game.canvas)
            fence.x = fenceObject.Fences[i].x
            fence.y = fenceObject.Fences[i].y
            fence.src = fenceObject.Fences[i].src
            Fences.push(fence)
        }
        //console.log(Fences)
        return Fences
    }


    fenceArray() {
        const game = this
        return game.getFences()
    }



    start() {
        const game = Game;
        window.requestAnimationFrame(function () {
            game.runGameLoop();
        });
    }


    /*
        if (game.state === 1) {
            return await LoadGame(canvas, state)
        }
        if (game.state === 2) {
            return await StartGame(canvas, game.context, state)
        }
        if (game.state === 3) {
            await endGame(canvas)
        }

    */


    static async runGameLoop() {
        const game = Game;
        switch (game.currentState) {
            case INITIAL:
                // DRAW INITIAL SCREEN
                await game.drawInitialScreen();
                break;
            case GAME_PLAYING:
                // DRAW GAME PLAYING SCREEN
                await game.drawGamePlayingScreen();
                break;
            case GAME_OVER:
                // DRAW GAME OVER SCREEN
                await game.drawGameOverScreen();
                break;
        }
        window.requestAnimationFrame(function () {
            game.runGameLoop();
        });

    }

    static async drawInitialScreen() {
        const game = Game;
        const start = new LoadScreen(game.canvas)
        await start.Draw()

    }

    static async drawGamePlayingScreen() {
        const game = Game;

        //game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        const background = new Background(game.canvas)
        await background.Draw()

        await game.drawSheep()

        game.lives.Draw()


        const treasure = await addTreasure(game.canvas)
        await createMaze(game.canvas, game.fences)

        //createTreasure(game.canvas, treasure)


        this.context.font = '15px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('game screen', 450, 30)


    }

    static async drawGameOverScreen() {
        const game = Game;
        const end = new EndGame(game.canvas)
        await end.Draw()


    }


    static addEventListener() {

        const game = this;
        window.addEventListener('keydown', function (event) {
            switch (game.currentState) {
                case INITIAL:
                    if (event.code === "Space") {
                        game.currentState = GAME_PLAYING;
                    }
                    break;
                case GAME_PLAYING:
                    break;
            }
        });

        // Key Listener
        window.addEventListener('keydown', function (event) {
            switch (game.currentState) {
                case GAME_OVER:
                    if (event.code === "Space") {
                        console.log(event.code);
                        game.currentState = GAME_PLAYING;
                    }
                    break;
            }
        });

        let fences = []
        let treasure = []
        window.addEventListener("keydown", function (event) {
            if (event.code === "ArrowUp") {
                let TemporaryY = game.sheep.y - 5
                if (CollisionCheck(game.sheep.x, TemporaryY, fences, treasure)) {
                    game.sheep.y = game.sheep.y - 5
                }
                else {
                    game.lives.score  -=  1
                    if (game.lives.score <= 0){
                        game.currentState = GAME_OVER}
                }
            }
            if (event.code === "ArrowDown") {
                console.log(event.code)

                let TemporaryY = game.sheep.y + 5
                if (CollisionCheck(game.sheep.x, TemporaryY, fences, treasure)) {
                    game.sheep.y = game.sheep.y + 5
                }
                else {
                    game.lives.score  -=  1
                    if (game.lives.score <= 0){
                        game.currentState = GAME_OVER}

                }
            }
            if (event.code === "ArrowRight") {
                console.log(event.code)
                let TemporaryX = game.sheep.x + 5
                if (CollisionCheck(TemporaryX, game.sheep.y, fences, treasure)) {
                    game.sheep.x = game.sheep.x + 5

                }
                else {
                    game.lives.score  -=  1
                    if (game.lives.score <= 0){
                        game.currentState = GAME_OVER}

                }
            }
            if (event.code === "ArrowLeft") {
                console.log(event.code)
                let TemporaryX = game.sheep.x - 5
                if (CollisionCheck(TemporaryX, game.sheep.y, fences, treasure)) {
                    game.sheep.x = game.sheep.x - 5
                }
                else {
                    game.lives.score  -=  1
                    if (game.lives.score <= 0){
                        game.currentState = GAME_OVER}

                }


            }
        })






    }

    static async drawSheep() {
        const game = this;




        let now = new Date()


        if ((now.getMilliseconds() - game.startTime.getMilliseconds()) % 1 === 0) {

            //console.log("start" + game.startTime.getMilliseconds())
            //console.log("now" + now.getMilliseconds())

            //console.log(game.sheepCounter)
            game.sheepCounter++
            game.sheepCounter %= 6
            game.sheep.DrawTile(game.sheepCounter)
        }
    }
}

/*function start () {
    window.webkitRequestAnimationFrame(function () {
        runGameLoop();
    })
}*/

/*function runGameLoop() {
    const game = this
    // controls the loop the game is currently in
    if (game.state === 1) {
        //return await LoadGame(canvas, state)

    }
    if (game.state === 2) {
        /!*
        return await StartGame(canvas, game.context, state)*!/
    }
    if (game.state === 3) {
        // await endGame(canvas)
    }
}*/

/*async function LoadGame(canvas, state) {
    const start = new LoadScreen(canvas)
    await start.Draw()
    window.addEventListener('keydown', function (event) {
        if (event.code === "Space") {
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
    const lives = new Lives(canvas)
    await GameEngine(canvas, context, fences, background, sheep, treasure, lives, state)
}

/!*async function endGame(canvas) {

    const end = new EndGame(canvas)
    await end.Draw()

}*!/*/


/*export async function getFences(canvas) {
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


}*/

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

/*
function GameEngine(canvas, context, fences, background, sheep, treasure, lives, state) {
    window.requestAnimationFrame(animationLoop)
    console.log(state)
    let counter = 0;
    let start = new Date()
    console.log(background)
    background.DrawTile()
    sheep.Draw()
    lives.Draw()


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
            if (lives.score <= 0) {
                state = 3
                Game(canvas, state)

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
*/


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



