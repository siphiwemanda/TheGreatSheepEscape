import {FenceFactory} from "./FenceFactory.js";
import {generateRandomNumber, generateRandomNumberMaxThree} from "./utils.js";
import {Carrot} from "./Carrot.js";
import {Pepper} from "./Pepper.js";

export async function getFences(canvas) {

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

export async function addFruit(canvas) {

    const fruitArray = []
    for (let i = 0; i < generateRandomNumberMaxThree(); i++) {
        let carrot = new Carrot(canvas, generateRandomNumber(), generateRandomNumber())
        let pepper = new Pepper(canvas, generateRandomNumber(), generateRandomNumber())
        fruitArray.push(carrot, pepper)
    }
    //console.log(treasureArray)
    return fruitArray
}