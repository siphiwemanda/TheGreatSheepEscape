import {GameFactory} from "./GameFactory.js";
import {generateRandomNumber, generateRandomNumberMaxThree} from "./utils.js";

export async function getFences(canvas) {

    let fenceObject;
    await fetch("../data/fences.json").then(function (response) {
        return response.json()
    }).then(function (JSONObject) {
        fenceObject = JSONObject
    }).catch(function (error) {
        console.log('Data failed to load')
        console.log(error)
    })

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

export async function addFruit(canvas) {

    let fruitObject;
    await fetch("../data/fruit.json").then(function (response) {
        return response.json()
    }).then(function (JSONObject) {
        fruitObject = JSONObject
    }).catch(function (error) {
        console.log('Data failed to load')
        console.log(error)
    })
    const Fences = []
    for (let i = 0; i < fruitObject.Fruit.length; i++) {

        let fence = new GameFactory(canvas)
        fence.x = fruitObject.Fruit[i].x
        fence.y = fruitObject.Fruit[i].y
        fence.src = fruitObject.Fruit[i].src
        Fences.push(fence)
    }
    return Fences
}