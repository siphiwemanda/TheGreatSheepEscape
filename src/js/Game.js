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

    start() {
        const game = Game;
        window.requestAnimationFrame(function () {
            game.runGameLoop();
        });
    }

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
        await game.innitalScreen.Draw()











    }

    static async drawGamePlayingScreen() {
        const game = Game;

        //game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        const background = new Background(game.canvas)
        await background.Draw()
        await game.createMaze()
        await game.createTreasure()

        await game.drawSheep()

        game.lives.Draw()

    }

    static async drawGameOverScreen() {
        const game = Game;
        await game.gameOverScreen.Draw()
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


        let treasure = []
        window.addEventListener("keydown", function (event) {
            if (event.code === "ArrowUp") {
                let TemporaryY = game.sheep.y - 5
                if (CollisionCheck(game.sheep.x, TemporaryY, game.fences, treasure)) {
                    game.sheep.y = game.sheep.y - 5
                }
                if (game.fruitCollision()){

                }
                else {
                    game.lives.score  -=  1
                    if (game.lives.score <= 0){
                        game.currentState = GAME_OVER}
                }
            }
            if (event.code === "ArrowDown") {
                let TemporaryY = game.sheep.y + 5
                if (CollisionCheck(game.sheep.x, TemporaryY, game.fences, treasure)) {
                    game.sheep.y = game.sheep.y + 5
                }
                else {
                    game.lives.score  -=  1
                    if (game.lives.score <= 0){
                        game.currentState = GAME_OVER}

                }
            }
            if (event.code === "ArrowRight") {
                let TemporaryX = game.sheep.x + 5
                if (CollisionCheck(TemporaryX, game.sheep.y, game.fences, treasure)) {
                    game.sheep.x = game.sheep.x + 5

                }
                else {
                    game.lives.score  -=  1
                    if (game.lives.score <= 0){
                        game.currentState = GAME_OVER}

                }
            }
            if (event.code === "ArrowLeft") {
                let TemporaryX = game.sheep.x - 5
                if (CollisionCheck(TemporaryX, game.sheep.y, game.fences, treasure)) {
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
            game.sheepCounter++
            game.sheepCounter %= 6
            game.sheep.DrawTile(game.sheepCounter)
        }
    }
    static createTreasure() {
        const game = this;
        for (let i = 0; i < game.fruit.length; i++) {
            game.fruit[i].Draw(game.fruit[i].src, game.fruit[i].x, game.fruit[i].y)
        }
    }
    static createMaze() {
        const game = this;
        for (let i = 0; i < game.fences.length; i++) {
            game.fences[i].DrawTile(game.fences[i].src, game.fences[i].x, game.fences[i].y)
        }
    }
    static fruitCollision(){
        let noFruit = true

        const game = this;
        for (let i = 0; i < game.fruit.length; i++) {

            if (game.sheep.x >= game.fruit[i].x && game.sheep.x <= game.fruit[i].x + 32 && game.sheep.y >= game.fruit[i].y && game.sheep.y <= game.fruit[i].y + 32) {
                console.log('nom')
                //game.fruit.splice(game.fruit[i], 1)



            }
        }
    }
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



