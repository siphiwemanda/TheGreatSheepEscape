export class LoadScreen {
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
        this.context.fillText('Escape Olde Worlde Farm', 350, 200)
        this.context.fillText('click to start', 350, 250)
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
    Drawyellow() {
        return new Promise(resolve => {
            this.img = new Image()
            this.img.src = "../img/sheep/yellowSheepIdle.png"
            this.img.onload = () => {
                this.context.drawImage(this.img, this.cellWidth, 0, this.cellWidth, this.cellHeight, 536, 300, this.cellHeight, this.cellHeight)
                resolve()
            }
        })

    }
    Drawwhite() {
        return new Promise(resolve => {
            this.img = new Image()
            this.img.src = "../img/sheep/whiteSheepIdle.png"
            this.img.onload = () => {
                this.context.drawImage(this.img, this.cellWidth, 0, this.cellWidth, this.cellHeight, 672, 300, this.cellHeight, this.cellHeight)
                resolve()
            }
        })

    }
    Drawblack() {
        return new Promise(resolve => {
            this.img = new Image()
            this.img.src = "../img/sheep/blackSheepIdle.png"
            this.img.onload = () => {
                this.context.drawImage(this.img, this.cellWidth, 0, this.cellWidth, this.cellHeight, 800, 300, this.cellHeight, this.cellHeight)
                resolve()
            }
        })

    }

}