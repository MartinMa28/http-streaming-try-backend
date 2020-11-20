const Task = require('../models/task');
const express = require('express');

const router = express.Router();

router.post('/new', (req, res) => {
  console.log(req.body);
  Task.create(
    {
      task: req.body.task,
    },
    (err, task) => {
      if (err) {
        console.log(`CREATE Error: ${err}`);
        res.status(500).send('Failed to create a task.');
      } else {
        res.status(200).json(task);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      console.log(`DELETE Error: ${error}`);
      res.status(500).send('Failed to delete a task.');
    } else if (task) {
      task.remove(() => {
        res.status(200).json(task);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
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
