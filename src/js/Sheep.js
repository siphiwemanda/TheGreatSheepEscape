class Sheep {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.x = 100;
        this.y = 100
        this.cellwidth = 140
        this.cellHeight = 103;
    }

    Draw() {
        return new Promise(resolve => {
            this.img = new Image()
            this.img.src = null
            this.img.onload = () => {
                this.context.drawImage(this.img, this.cellwidth, 0, this.cellwidth, this.cellHeight, this.x, this.y, this.cellHeight * 0.5, this.cellHeight * 0.5)
                resolve()
            }
        })
    }

    DrawTile() {
        this.img = new Image()
        this.img.src = null

        this.context.drawImage(this.img, this.cellwidth, 0, this.cellwidth, this.cellHeight, this.x, this.y, this.cellHeight * 0.5, this.cellHeight * 0.5)


    }
}