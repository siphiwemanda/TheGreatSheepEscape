//THIS CLASS DRAWS THE START SCREEN
export class LoadScreen {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.cellWidth = 136;
        this.cellHeight = 96;
        this.font = '20px serif'
        this.textColour = 'black'
        const gradient = this.context.createLinearGradient(0, 0, 200, 0)
        gradient.addColorStop(0, "#e7e7e7")
        gradient.addColorStop(1, "#b0d6ca")
        this.context.fillStyle = gradient
        this.context.fillRect(0, 0, 1200, 800)
    }

    Text(){
        this.context.fillStyle = this.textColour
        this.context.font = '48px serif'
        this.context.fillText('Escape Olde Worlde Farm', 350, 200)
        this.context.font = this.font
        this.context.fillText('press space to start', 510, 250)
        this.context.fillText('press space to start', 510, 250)
        this.context.fillText('just remember if you hit a fence you lose a life', 450, 450)
        this.context.fillText('eat a carrot or a pepper gain a life ', 480, 500)
        this.context.fillText('all you have to do is get me to the hay ', 470, 550)
    }

    Draw(src,x,y) {
        this.sheep = new Image()
        this.sheep.src = src
        this.context.drawImage(this.sheep, this.cellWidth, 0, this.cellWidth, this.cellHeight, x, y, this.cellHeight, this.cellHeight)
    }
}