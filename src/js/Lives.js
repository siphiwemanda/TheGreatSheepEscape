export class Lives {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')

        this.score = 10
        this.x = 1100
        this. y = 20

    }
    Draw(){

        this.context.font = '16px verdana'
        this.context.fillText('Life: ' + this.score, this.x, this.y)
    }
    upDateScore(newScore){
        this.context.font = '16px verdana'
        this.context.fillText('Life: ' + newScore, this.x, this.y)
    }
}