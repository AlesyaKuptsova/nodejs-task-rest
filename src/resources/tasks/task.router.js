const router = require('express').Router();
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/:boardId/tasks').get(
  async (req, res) => {
    const tasks = await taskService.getTasksByBoardId(req.params.boardId);
    await res.json(tasks.map(Task.toResponse));
  }
);

router.route('/:boardId/tasks/:taskId').get(
  async (req, res) => {
    const task = await taskService.getTasksByBoardTaskIds(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      await res.json(Task.toResponse(task));
    } else {
        res.status(404).json();
    }
  }
);

router.route('/:boardId/tasks').post(
async (req, res) => {
    const task = await taskService.createTask(req.params.boardId, req.body);
    res.json(Task.toResponse(task));
  }
);

router.route('/:boardId/tasks/:taskId').put(
 async (req, res) => {
    const task = await taskService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    if (task) {
      await res.json(Task.toResponse(task));
    } else {
       res.status(404).json();
    }
  }
);

router.route('/:boardId/tasks/:taskId').delete(
  async (req, res) => {
    if (await taskService.deleteTask(req.params.taskId)) {
      res.status(204).json();
    } else {
     res.status(404).json();
    }
  }
);

module.exports = router;