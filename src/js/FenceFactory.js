class FenceFactory {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height

    }

    Draw(src, x, y) {
        this.x = x
        this.y = y
        this.img = new Image()
        this.img.src = src
        this.img.onload = () => {
            this.context.drawImage(this.img, this.x, this.y)
        }
    }

    DrawTile(src, x, y) {
        this.x = x
        this.y = y
        this.img = new Image()
        this.img.src = src

        this.context.drawImage(this.img, this.x, this.y)
    }
}