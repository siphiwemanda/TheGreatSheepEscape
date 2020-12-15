export class GameScore{
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')

        this.start = new Date()
        this.score = 0
        this.x = 0
        this. y = 0

    }
    Draw(){
        const draw = new Date()
        this.score = parseFloat((draw - this.start)/1000).toFixed(1)
        this.context.font = '45px verdana'
        this.context.fillText(this.score, this.x, this.y)
    }
}