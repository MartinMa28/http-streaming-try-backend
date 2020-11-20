const Task = require('../models/task');
const express = require('express');

const router = express.Router();

router.post('/new', async (req, res) => {
  try {
    const task = await Task.create({ task: req.body.task });
    res.status(200).json(task);
  } catch (err) {
    console.log(`CREATE Error: ${err}`);
    res.status(500).send('Failed to create a task.');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      await task.remove();
      res.status(200).json(task);
    } else {
      res.status(404).send('Not found');
    }
  } catch (err) {
    console.log(`DELETE Error: ${error}`);
    res.status(500).send('Failed to delete a task.');
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();

    console.log(`Found ${tasks.length} tasks`);
    res.status(200).json({
      tasks: tasks,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
