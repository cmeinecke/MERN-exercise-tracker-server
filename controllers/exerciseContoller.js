const Exercise = require("../models/exerciseModel");
const mongoose = require("mongoose");

// GET all exercises
const getExercises = async (req, res) => {
  const exercises = await Exercise.find({}).sort({ createdAt: -1 });

  res.status(200).json(exercises);
};

// GET a single exercise
const getExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exercise" });
  }

  const exercise = await Exercise.findById(id);

  if (!exercise) {
    return res.status(404).json({ error: "No such exercise" });
  }

  res.status(200).json(exercise);
};

// CREATE a new exercise
const createExercise = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db

  try {
    const exercise = await Exercise.create({ title, reps, load });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an exercise
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exercise" });
  }

  const exercise = await Exercise.findOneAndDelete({ _id: id });

  if (!exercise) {
    return res.status(404).json({ error: "No such exercise" });
  }

  res.status(200).json(exercise);
};

// UPDATE an exercise
const updateExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exercise" });
  }

  const exercise = await Exercise.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!exercise) {
    return res.status(404).json({ error: "No such exercise" });
  }

  res.status(200).json(exercise);
};

module.exports = {
  getExercises,
  getExercise,
  createExercise,
  deleteExercise,
  updateExercise,
};
