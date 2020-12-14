async function Game(canvas) {
    const game = this;


    game.canvas = canvas;
    game.context = game.canvas.getContext('2d')

    game.state = 1

    if (game.state === 1) {
        const start = new LoadScreen(canvas)
        console.log(start)
        await start.Draw()
        await start.Drawblack()
        await start.Drawwhite()
        await start.Drawyellow()
    } else {

        const background = new Background(canvas)
        const sheep = new Sheep(canvas)
        const fences = await getFences(canvas)
        console.log(fences)
        await GameEngine(canvas, game.context, fences, background, sheep)
    }

}


async function getFences() {
    let fenceObject;

    await fetch("../data/fences.json").then(function (response) {
        return response.json()
    }).then(function (JSONObject) {
        //console.log(JSONObject)
        fenceObject = JSONObject
    }).catch(function (error) {
        console.log('Data failed to load')
        console.log(error)
    })

    const Fences = []
    for (let i = 0; i < fenceObject.Fences.length; i++) {
        let fence = new FenceFactory(canvas)
        fence.x = fenceObject.Fences[i].x
        fence.y = fenceObject.Fences[i].y
        fence.src = fenceObject.Fences[i].src
        Fences.push(fence)
    }
    //console.log(Fences)
    return Fences


}

async function createMaze(canvas, fences) {
    for (let i = 0; i < fences.length; i++) {
        fences[i].DrawTile(fences[i].src, fences[i].x, fences[i].y)
    }
}

async function GameEngine(canvas, context, fences, background, sheep) {
    window.requestAnimationFrame(animationLoop)

    let counter = 0;
    let start = new Date()

    function animationLoop() {

        let now = new Date()
        if (now - start >= 100) {
            start = now
            context.clearRect(0, 0, canvas.width, canvas.height)

            counter++
            counter %= 6

            background.DrawTile()
            createMaze(canvas, fences)
            sheep.DrawTile(counter)
        }
        window.requestAnimationFrame(animationLoop)

    }

    window.addEventListener("keydown", function (event) {
        if (event.code === "ArrowUp") {
            console.log(event.code)
            sheep.y = sheep.y - 5
        }
        if (event.code === "ArrowDown") {
            console.log(event.code)
            sheep.y = sheep.y + 5

        }
        if (event.code === "ArrowRight") {
            console.log(event.code)
            sheep.x = sheep.x + 5

        }
        if (event.code === "ArrowLeft") {
            console.log(event.code)
            sheep.x = sheep.x - 5

        }
    })

}