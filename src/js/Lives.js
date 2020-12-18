//THIS CLASS CONTROLS LIVES
export class Lives {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')

        this.score = 20
        this.x = 1080
        this. y = 30

    }
    Draw(){

        this.context.font = '25px verdana'
        this.context.fillStyle = "red";
        this.context.fillText('Lives: ' + this.score, this.x, this.y)
    }
}