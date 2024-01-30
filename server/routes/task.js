const express = require('express')
const app = express.Router()
const Tasks = require("../controllers/task")

app.post("/tasks",Tasks.createTask);
app.get('/tasks',Tasks.getTasks);
app.delete('/tasks/:id',Tasks.deleteTask)

module.exports = app;