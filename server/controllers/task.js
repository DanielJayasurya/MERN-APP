const mongoose = require("mongoose");
const taskModel = require("../models/model").Task;

//To create a task - POST

const createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const task = await taskModel.create({ title });
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


const deleteTask = async(req,res) =>{
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }
  try{
    const deletetask = await taskModel.findByIdAndDelete(id);
    res.status(200).json(deletetask)
  }catch(e){
    res.status(400).json({ error: e.message });
  }
}

module.exports = { createTask,getTasks,deleteTask };
