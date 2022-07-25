const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model.js");

// GET "/drones" => Listar todos los drones por su nombre
router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const droneList = await Drone.find();
    res.render("drones/list.hbs", { droneList });
  } catch (err) {
    next(err);
  }
  // ... your code here
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form.hbs"); // la vista
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  // 1. donde se recibe la data
  const { name, propellers, maxSpeed } = req.body; // esta va fuera del try

  // 2. creamos el drone en la BD
  try {
    await Drone.create({
      name,
      propellers,
      maxSpeed,
    });
    console.log("drone creado");
    res.redirect("/drones");
  } catch (err) {
    res.render("drones/create-form.hbs");
  }
});

router.get("/drones/:droneId/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  // 1. Obtener id del dron a editar
  const { droneId } = req.params;
  try {
    // 2. Buscar el dron el la BD
    const selectedDrone = await Drone.findById(droneId);
    // 3. Renderizar vista con dron seleccionado
    res.render("drones/update-form.hbs", { selectedDrone });
  } catch (err) {
    next(err);
  }
});

router.post("/drones/:droneId/edit", async (req, res, next) => {
  // Iteration #4: Update the drone

  // 1. Obtener id del dron a modificar
  const { droneId } = req.params;

  // 2. Obtener nuevos datos del dron
  const { name, propellers, maxSpeed } = req.body;

  // 3. Actualizar el dron
  try {
    await Drone.findByIdAndUpdate(droneId, {
      name,
      propellers,
      maxSpeed,
    });
    console.log("Drone actualizado");
    // 4. Redireccion
    res.redirect("/drones");
  } catch (err) {
    res.render("drones/update-form.hbs");
  }
});

router.post("/drones/:droneId/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
    // 1. obtener el id
    const {droneId} = req.params

    //2. usar metodo para borrar
   await Drone.findByIdAndDelete(droneId)
   res.redirect("/drones")
    
  } catch (error) {
    next(err)
  }
});

module.exports = router;
