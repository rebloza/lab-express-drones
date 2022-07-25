// Iteration #1

// conextion con la DB
require("../db")
const mongoose = require("mongoose") 

// elementos a agregar 
const droneArr = require("./drones.json")

// requerir el modelo
const Drone = require("../models/Drone.model.js")

//insertar los elemntos

// const addDrones = async() => {
//     try {
//         await Drone.insertMany(droneArr)
//         console.log("Drones agregados")
//         mongoose.connection.close()
//     }catch (err) {
//         next(err)
//     }
// }
// addDrones()

const addDrones = async() => {
    try {
        await Drone.create(droneArr)
        console.log("drones agragados", droneArr) 
    } catch (err) {
        next(err)
    }
}

addDrones()



