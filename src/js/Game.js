async function Game(canvas){
    const game = this;

    game.canvas = canvas;
    game.context = game.canvas.getContext('2d')
    await createBackground(canvas)

    const background = new Background(canvas)
    const sheep = new Sheep(canvas)
    const fences = await getFences(canvas)
    await GameEngine(canvas, game.context, fences, background, sheep)

}

async function createBackground(canvas){
    const background = new Background(canvas)
    await background.Draw()

    console.log(background)
}

async function getFences() {
    let fenceObject;

    await fetch("../data/fences.json").then(function (response) {
        return response.json()
    }).then(function (JSONObject) {
        console.log(JSONObject)
        fenceObject = JSONObject
    }).catch(function (error){
        console.log('Data failed to load')
        console.log(error)
    })

    const Fences = []
    for (let i =0; i < fenceObject.Fences.length; i++) {
        let fence = new FenceFactory(canvas)
        fence.x = fenceObject.Fences[i].x
        fence.y = fenceObject.Fences[i].y
        fence.src = fenceObject.Fences[i].src
        Fences.push(fence)
    }
    console.log(Fences)


}
async function createMaze(){
    
}

async function GameEngine() {
    
}