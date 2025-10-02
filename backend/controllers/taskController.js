
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user._id });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};



export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await Task.findByIdAndDelete(req.params.id);  
  res.json({ message: "Task removed" });
};

