const express = require('express');
const { getTasks,getTask,createTask,updateTask,deleteTask} = require('../Controller/taskController');
const auth = require('../Middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;