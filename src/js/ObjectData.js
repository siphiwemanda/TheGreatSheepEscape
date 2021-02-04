import {GameFactory} from "./GameFactory.js";

// CREATES THE FENCES
export async function getFences(canvas) {
    // FENCES COORDINATES ARE IN A JSON FILE, THIS READS IN THE JSON FILE AND CREATES AN ARRAY
    let fenceObject;
    await fetch("../data/fences.json").then(function (response) {
        return response.json()
    }).then(function (JSONObject) {
        fenceObject = JSONObject
    }).catch(function (error) {
        console.log('Data failed to load')
        console.log(error)
    })
    // THIS ITERATES THROUGH THE ARRAY AND CREATES INSTANCES OF THE GAME FACTORY TO BE USED IN THE GAME CLASS
    const Fences = []
    for (let i = 0; i < fenceObject.Fences.length; i++) {

        let fence = new GameFactory(canvas)
        fence.x = fenceObject.Fences[i].x
        fence.y = fenceObject.Fences[i].y
        fence.src = fenceObject.Fences[i].src
        Fences.push(fence)
    }
    return Fences
}
// CREATES THE FRUIT
export async function addFruit(canvas) {
    // FRUIT COORDINATES ARE IN A JSON FILE, THIS READS IN THE JSON FILE AND CREATES AN ARRAY
    let fruitObject;
    await fetch("../data/fruit.json").then(function (response) {
        return response.json()
    }).then(function (JSONObject) {
        fruitObject = JSONObject
    }).catch(function (error) {
        console.log('Data failed to load')
        console.log(error)
    })
    // THIS ITERATES THROUGH THE ARRAY AND CREATES INSTANCES OF THE GAME FACTORY TO BE USED IN THE GAME CLASS
    const Fruit = []
    for (let i = 0; i < fruitObject.Fruit.length; i++) {
        let fruit = new GameFactory(canvas)
        fruit.x = fruitObject.Fruit[i].x
        fruit.y = fruitObject.Fruit[i].y
        fruit.src = fruitObject.Fruit[i].src
        Fruit.push(fruit)
    }
    return Fruit
}