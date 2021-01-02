import {Sheep} from './Sheep.js'
import {Background} from './Background.js'
import {LoadScreen} from './LoadScreen.js'
import {EndGame} from './EndGame.js'
import {Lives} from './Lives.js'

const INITIAL = 1;
const GAME_PLAYING = 2;
const GAME_OVER = 3;

export class Game {
    constructor(canvas, fences, fruit) {
        const game = Game;
        game.canvas = canvas;
        game.context = game.canvas.getContext('2d')
        game.currentState = INITIAL
        game.addEventListener()
        game.fences = fences
        game.fruit = fruit
        game.startTime = new Date()
        game.sheepCounter = 0
        game.innitalScreen = new LoadScreen(game.canvas)
        game.gameOverScreen = new EndGame(game.canvas)
        game.sheep = new Sheep(game.canvas)
        game.lives = new Lives(game.canvas)
    }
    // ONCE THIS IS CALLED THE GAME IS STARTED
    start() {
        const game = Game;
        window.requestAnimationFrame(function () {
            game.runGameLoop().then(r => {
                console.log('game loop started')
            });
        });
    }
   // THE GAME LOOP CONTROLS THE STATE THE GAME IS IN
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
        // CONTROLS THE ANIMATION BY RERUNNING THE GAME LOOP
        window.requestAnimationFrame(function () {
            game.runGameLoop();
        });

    }
    // CREATES THE START SCREEN
    static async drawInitialScreen() {
        const game = Game;
        //game.context.clearRect(500, 400, 400, 250);
        await game.innitalScreen.Draw()


    }
    // CREATES THE GAME PLAYING SCREEN
    static async drawGamePlayingScreen() {
        const game = Game;
        const background = new Background(game.canvas)
        await background.Draw()
        await background.DrawHay()
        await game.createFruit()
        await game.createMaze()
        game.lives.Draw()
        await game.drawSheep()
    }
    // CREATES THE END SCREEN
    static async drawGameOverScreen() {
        const game = Game;
        await game.gameOverScreen.Draw(game.lives.score)
    }

    // LISTENS FOR USER CONTROLS
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


        window.addEventListener('keydown', function (event) {
            switch (game.currentState) {
                case GAME_OVER:
                    if (event.code === "Space") {
                        console.log(event.code);
                        game.reset()
                        game.currentState = GAME_PLAYING;
                    }
                    break;
            }
        });


        window.addEventListener("keydown", function (event) {
                if (event.code === "ArrowUp") {
                    let TemporaryY = game.sheep.y - 5
                    if (SheepCollision(game.sheep.x, TemporaryY, game.fences)) {
                        game.sheep.y = game.sheep.y - 5
                        let index = fruitCollision(game.sheep.x, TemporaryY, game.fruit)
                        if (index !== -1) {
                            game.fruit.splice(index, 1)
                            console.log("beep")
                            game.lives.score += 1

                        }
                        if (game.sheep.x >= 944 && game.sheep.y >= 672) {
                            game.currentState = GAME_OVER
                        }
                    } else {
                        game.lives.score -= 1
                        if (game.lives.score <= 0) {
                            game.currentState = GAME_OVER
                        }
                    }

                }
                if (event.code === "ArrowDown") {
                    let TemporaryY = game.sheep.y + 5
                    if (SheepCollision(game.sheep.x, TemporaryY, game.fences)) {
                        game.sheep.y = game.sheep.y + 5
                        let index = fruitCollision(game.sheep.x, TemporaryY, game.fruit)
                        if (index !== -1) {
                            game.fruit.splice(index, 1)
                            console.log("beep")
                            game.lives.score += 1

                        }
                        if (game.sheep.x >= 944 && game.sheep.y >= 672) {
                            game.currentState = GAME_OVER
                        }
                    } else {
                        game.lives.score -= 1
                        if (game.lives.score <= 0) {
                            game.currentState = GAME_OVER
                        }
                    }
                }

                if (event.code === "ArrowRight") {
                    let TemporaryX = game.sheep.x + 5
                    if (SheepCollision(TemporaryX, game.sheep.y, game.fences)) {
                        game.sheep.x = game.sheep.x + 5
                        let index = fruitCollision(TemporaryX, game.sheep.y, game.fruit)
                        if (index !== -1) {
                            game.fruit.splice(index, 1)
                            console.log("beep")
                            game.lives.score += 1

                        }
                        if (game.sheep.x >= 944 && game.sheep.y >= 672) {
                            game.currentState = GAME_OVER
                        }

                    } else {
                        game.lives.score -= 1
                        if (game.lives.score <= 0) {
                            game.currentState = GAME_OVER
                        }

                    }
                }
                if (event.code === "ArrowLeft") {
                    let TemporaryX = game.sheep.x - 5
                    if (SheepCollision(TemporaryX, game.sheep.y, game.fences)) {
                        game.sheep.x = game.sheep.x - 5
                        let index = fruitCollision(TemporaryX, game.sheep.y, game.fruit)
                        if (index !== -1) {
                            game.fruit.splice(index, 1)
                            game.lives.score += 1
                            console.log("beep")

                        }
                        if (game.sheep.x >= 944 && game.sheep.y >= 672) {
                            game.currentState = GAME_OVER
                        }
                    } else {
                        game.lives.score -= 1
                        if (game.lives.score <= 0) {
                            game.currentState = GAME_OVER
                        }

                    }
                }
            }
        )
    }
    //DRAWS THE SHEEP AND CONTROLS HIS ANIMATION
    static async drawSheep() {
        const game = this;
        let now = new Date()

        if ((now.getMilliseconds() - game.startTime.getMilliseconds()) % 1 === 0) {
            game.sheepCounter++
            game.sheepCounter %= 6
            game.sheep.DrawTile(game.sheepCounter)
        }
    }
    // USING THE PASSED IN ARRAY DRAWS THE FRUIT
    static createFruit() {
        const game = this;
        for (let i = 0; i < game.fruit.length; i++) {
            game.fruit[i].Draw(game.fruit[i].src, game.fruit[i].x, game.fruit[i].y)
        }
    }
    // USING THE PASSED IN ARRAY DRAWS THE FENCES
    static createMaze() {
        const game = this;
        for (let i = 0; i < game.fences.length; i++) {
            game.fences[i].DrawTile(game.fences[i].src, game.fences[i].x, game.fences[i].y)
        }
    }
    // ALLOWS FOR THE RESETTING OF THE GAME
    static reset(){
        const game = this;
        game.lives.score = 20
        game.sheep.x = 10
        game.sheep.y =10
    }
}
 // TO SEE WHETHER THERE WAS A COLLISION BETWEEN A FENCE AND A SHEEP OR THE EDGE OF THE PLAYING AREA
export function SheepCollision(sheepX, sheepY, fences) {
    let noCollision = true
    const rightEdge = 1200 - 45;
    const leftEdge = 0;
    const topEdge = 0
    const bottomEdge = 800 - 45
    fences.forEach(fence => {
            if (fence.src.includes('Vertical') && (sheepX >= fence.x - 32 && sheepX <= fence.x + 32 && sheepY >= fence.y && sheepY <= fence.y + 128)) {
                noCollision = false
            }
            if (fence.src.includes('Horizontal') && (sheepY >= fence.y - 64 && sheepY <= fence.y + 64 && sheepX + 50 >= fence.x && sheepX + 50 <= fence.x + 128)) {
                noCollision = false
            }
        }
    )
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
//CHECK IF THERE WAS A COLLISION BETWEEN SHEEP AND FRUIT
/*export function fruitCollision(sheepX, sheepY, fruit) {
    let noFruit = -1
    for (let i = 0; i < fruit.length; i++) {
        if (sheepX >= fruit[i].x - 32 && sheepX <= fruit[i].x + 32 && sheepY >= fruit[i].y - 32 && sheepY <= fruit[i].y + 32) {
            noFruit = i
        }
    }
    return noFruit
}*/

export function fruitCollision(sheepX, sheepY, fruits) {
    let noFruit = -1
    for (const {fruit, index} of fruits.map((f, i) => ({  fruit: f, index: i }))) {
        if (sheepX >= fruit.x - 32 && sheepX <= fruit.x + 32 && sheepY >= fruit.y - 32 && sheepY <= fruit.y + 32) {
            noFruit = index
        }
    }
    return noFruit
}