const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model.js")


// GET "/drones" => Listar todos los drones por su nombre
router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const droneList = await Drone.find()
    res.render("drones/list.hbs", {droneList})
  } catch (err) {
    next(err)
  }
  // ... your code here
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form.hbs") // la vista 
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  // 1. donde se recibe la data
  const {name, propellers, maxSpeed} = req.body // esta va fuera del try

  // 2. creamos el drone en la BD
   try {
     await Drone.create(
      {
       name, 
       propellers, 
       maxSpeed 
      })
      console.log("drone creado")
      res.redirect("/drones")
   } catch (err) {
       res.render("drones/create-form.hbs")
   }
  
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
