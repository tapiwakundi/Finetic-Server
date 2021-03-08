const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Track = require("../models/Track");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middlewares/requireAuth");
const Workout = require("../models/Workout");
const filterBy = require("../filtering/filterByTime");

const router = express.Router();



router.get("/workouts/:filter", async (req, res) => {
  id = req.user._id;
  const workoutFilter = req.params.filter

  if (workoutFilter == "all") {
     const workouts = await Workout.find();
     res.send(workouts)
     return
  }

  const workouts = await Workout.find({
    tags: workoutFilter
  });

  //Get tracks from this week only

  res.send(workouts);
});

router.post("/workout", async (req, res) => {
  const {
    name,
    createdBy,
    videoUrl,
    equipment,
    difficulty,
    time,
    description,
    heroimg,
    tags,
  } = req.body;

  try {
    const workout = new Workout({
      name,
      createdBy,
      videoUrl,
      equipment,
      difficulty,
      time,
      description,
      heroimg,
      tags,
    });

    await workout.save();
    console.log(workout);
    res.send(workout);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
