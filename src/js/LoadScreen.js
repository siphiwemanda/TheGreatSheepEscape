//THIS CLASS DRAWS THE START SCREEN
export class LoadScreen {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.cellWidth = 136;
        this.cellHeight = 96;
        const gradient = this.context.createLinearGradient(0, 0, 200, 0)
        gradient.addColorStop(0, "#e7e7e7")
        gradient.addColorStop(1, "#b0d6ca")
        this.context.fillStyle = gradient
        this.context.fillRect(0, 0, 1200, 800)
    }

    Draw() {
        this.context.font = '48px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('Escape Olde Worlde Farm', 350, 200)
        this.context.font = '20px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('press space to start', 510, 250)

        this.context.font = '20px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('just remember if you hit a fence you lose a life', 450, 450)

        this.context.font = '20px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('eat a carrot or a pepper gain a life ', 480, 500)

        this.context.font = '20px serif'
        this.context.fillStyle = 'black'
        this.context.fillText('all you have to do is get me to the hay ', 470, 550)

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


    }
}