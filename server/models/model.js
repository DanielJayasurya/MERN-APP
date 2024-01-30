const mongoose = require('mongoose');
 
const taskSchema = new mongoose.Schema({
  title:{type:String} ,
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});
taskSchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
 
module.exports =
{
  Task:mongoose.model("Task",taskSchema),
}