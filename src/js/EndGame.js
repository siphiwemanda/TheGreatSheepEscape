export class EndGame{
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.cellWidth = 136;

        this.cellHeight = 96;


        this.context.fillStyle = '#DAF7A6'
        this.context.fillRect(0,0,this.width,this.height)

        this.context.font ='48px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('EndGame', 350, 200)

    }
    Draw() {
        return new Promise(resolve => {
            this.img = new Image()
            this.img.src = "../img/sheep/PinkSheepIdle.png"
            this.img.onload = () => {
                this.context.drawImage(this.img, this.cellWidth, 0, this.cellWidth, this.cellHeight, 400, 300, this.cellHeight, this.cellHeight)
                resolve()
            }
        })

    }


}