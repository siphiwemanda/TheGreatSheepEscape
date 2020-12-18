import {LoadScreen} from "./LoadScreen.js";
export class EndGame extends LoadScreen{
    constructor(canvas) {
        super(canvas)
        {

        }
    }

    Draw(score){
        const gradient = this.context.createLinearGradient(0, 0, 200, 0)
        gradient.addColorStop(0, "#e7e7e7")
        gradient.addColorStop(1, "#b0d6ca")
        this.context.fillStyle = gradient
        this.context.fillRect(0, 0, 1200, 800)
        this.context.font = '48px serif'
        this.context.fillStyle = 'black'
        if(score <= 0){
            this.context.fillText('ops, maybe try again ', 420, 200)
            this.context.font = '20px serif'
            this.context.fillStyle = 'black'
            this.context.fillText('press space to replay', 480, 250)
            this.context.font = '20px serif'
            this.context.fillStyle = 'black'
            this.context.fillText(score, 510, 300)
        }
        else{
            this.context.fillText('what an escape', 420, 200)
            this.context.font = '20px serif'
            this.context.fillStyle = 'black'
            this.context.fillText('press space to replay', 480, 250)
            this.context.font = '20px serif'
            this.context.fillStyle = 'black'
            this.context.fillText(score, 510, 300)
        }

    }

}