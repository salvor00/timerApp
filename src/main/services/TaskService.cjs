const TaskRepository = require("../repository/TaskRepository");

function createTask(name) {
  return TaskRepository.createTask(name);
}

function getTasks() {
  return TaskRepository.findAll();
}

module.exports = {
  createTask,
  getTasks,
};
