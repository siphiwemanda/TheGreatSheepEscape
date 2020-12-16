export class Background {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
    }

    Draw() {
        return new Promise((resolve) => {
            const backgroundHeight = 256
            const backgroundWidth = 256

            const backgroundIMG = new Image()
            backgroundIMG.src = "../img/grass.png"
            backgroundIMG.onload = () => {
               // console.log(backgroundIMG)
                for (let i = 0; i * backgroundWidth <= this.canvas.width; i++) {
                    for (let j = 0; j * backgroundHeight <= this.canvas.height; j++) {
                        this.context.drawImage(backgroundIMG, i * backgroundWidth, j * backgroundHeight)
                    }
                }
                resolve()
            }
        })
    }

    DrawTile() {

            const backgroundHeight = 256
            const backgroundWidth = 256

            const backgroundIMG = new Image()
            backgroundIMG.src = "../img/grass.png"

        return new Promise((resolve) => {
            for (let i = 0; i * backgroundWidth <= this.canvas.width; i++) {
                for (let j = 0; j * backgroundHeight <= this.canvas.height; j++) {
                    this.context.drawImage(backgroundIMG, i * backgroundWidth, j * backgroundHeight)
                }
            }

            resolve()
        })
    }
}



