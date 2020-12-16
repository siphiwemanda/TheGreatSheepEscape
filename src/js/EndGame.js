import {LoadScreen} from "./LoadScreen.js";
export class EndGame extends LoadScreen{
    constructor(canvas) {
        super(canvas)
        {

        }
    }

    Draw(){
        this.context.font = '48px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('The End Looks like you made it out just in time ', 200, 200)
        this.context.font = '20px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('click to replay', 510, 250)

        return new Promise(resolve => {
            this.Pink = new Image()
            this.Pink.src = "../img/sheep/PinkSheepIdle.png"
            this.Pink.onload = () => {
                this.context.drawImage(this.Pink, this.cellWidth, 0, this.cellWidth, this.cellHeight, 350, 300, this.cellHeight, this.cellHeight)

            }
            this.yellow = new Image()
            this.yellow.src = "../img/sheep/yellowSheepIdle.png"
            this.yellow.onload = () => {
                this.context.drawImage(this.yellow, this.cellWidth, 0, this.cellWidth, this.cellHeight, 500, 300, this.cellHeight, this.cellHeight)

            }

            this.white = new Image()
            this.white.src = "../img/sheep/whiteSheepIdle.png"
            this.white.onload = () => {
                this.context.drawImage(this.white, this.cellWidth, 0, this.cellWidth, this.cellHeight, 650, 300, this.cellHeight, this.cellHeight)

            }
            this.black = new Image()
            this.black.src = "../img/sheep/blackSheepIdle.png"
            this.black.onload = () => {
                this.context.drawImage(this.black, this.cellWidth, 0, this.cellWidth, this.cellHeight, 800, 300, this.cellHeight, this.cellHeight)

            }

            resolve()
        })

    }

}