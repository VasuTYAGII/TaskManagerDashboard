import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";
import Calender from "./Calender";
import TaskProgress from "./Progressbar";
import { motion } from 'framer-motion';
import { Add, Done, Edit, Delete, Save , Cancel } from "@mui/icons-material";


export default function Dashboard() {
  const [tasks, setTasks] = useState([
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null); 
  const [editTaskValue, setEditTaskValue] = useState(""); 
  const [date, setDate] = useState(new Date());

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: uuidv4(), title: newTask.trim(), done: false },
    ]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const markAsDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, done: true } : task))
    );
  };

  const startEditing = (id, title) => {
    setEditTaskId(id);
    setEditTaskValue(title);
  };

  const saveEdit = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: editTaskValue } : task
      )
    );
    setEditTaskId(null);
    setEditTaskValue("");
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskValue("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  const remainingTasksCount = tasks.filter(task => !task.done).length;
  const allTasksCount = tasks.length;

  return (

    // Top Part

    <div className="dashboard-container">
      <div className="dashboard-header">
      <span className="heading1">Manage Tasks</span>
        <div className="main-data">
        <div className="srcBox">
        <span className="heading2">Manage Tasks</span>
          <input
            className="srcinput"
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="srcBtn" onClick={addTask} disabled={!newTask.trim()}>
          <span className="btnLogo"><Add/></span> <span className="btnName">Add Task</span>
          </button>
        </div>
        <div className="Calender">
            <Calender/>
        </div>
        </div>
      </div>
         
         {/* Center Part */}

      <div className="dashboard-sidebar">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All Tasks &nbsp;&nbsp;({allTasksCount})
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed Tasks
        </button>
        <button
          className={filter === "pending" ? "active-filter" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending Tasks
        </button>       
          <span className={remainingTasksCount==0 ? "remaining-tasks-0" : "remaining-tasks"}>{remainingTasksCount} Tasks Pending</span>
      </div>

      {/* Main Part */}

      <div className="lowerarea">
      <div className="dashboard-main">
        <h2>Tasks</h2>
        <ul>
          {filteredTasks.map((task) => (
            <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`task-card ${task.done ? "completed" : ""}`}
          >
              {editTaskId === task.id ? (
                <div className="edit-task">                  
                  <div>
                  <input className="editInput"
                    type="text"
                    value={editTaskValue}
                    onChange={(e) => setEditTaskValue(e.target.value)}
                  />
                  </div>
                  <div>
                  <button className="saveEdit" onClick={() => saveEdit(task.id)}>
                  <span className="btnLogo"><Save /></span><span className="btnName">Save</span></button>
                  <button className="cancelEdit" onClick={cancelEdit}>
                    <span className="btnLogo"><Cancel/></span><span className="btnName">Cancel</span>
                  </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{task.title}</span>
                  <div className="task-actions">
                  {!task.done && (
                     <button className="done" onClick={() => markAsDone(task.id)}>
                     <span className="btnLogo"><Done /></span> <span className="btnName">Mark as Done</span>
                     </button>
                   )}
                   {task.done && <h3 className="complete">Completed</h3>}
                    <button className="edit" onClick={() => startEditing(task.id, task.title)}>
                    <span className="btnLogo"><Edit /></span> <span className="btnName">Edit</span>
                    </button>
                    <button className="delete" onClick={() => deleteTask(task.id)}>
                    <span className="btnLogo"><Delete /></span> <span className="btnName">Delete</span>
                    </button>
                  </div> 
                </>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="Progressbar">
        <TaskProgress completed={allTasksCount-remainingTasksCount} total={allTasksCount} />
      </div>
      </div>
      </div>      
  );
}