//import logo from './logo.svg';
//import './App.css';

import { useState, useEffect } from "react";
import Task from "./Task";
import JsonServer from "../services/JsonServer";
import FormAddTask from "./FormAddTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        loadTasks();
      } 
      catch (error) {
        setError(`Erreur attrapée dans loadTasks` + error);
        console.error(`Erreur attrapée dans loadTasks` + error);
      }
    })();
  }, []);

  async function changeDone(id) {
    const copy_tasks = [...tasks];
    let done = false;
    copy_tasks.forEach((t) => {
      if (t.id === id) {
        t.done = !t.done;
        done = t.done;
      }
    });
    // TODO faire appel fonction pour faire le changement en BD
    await JsonServer.changeDoneInDb(id, done);
    setTasks((tasks) => copy_tasks);
  }

  async function deleteTask(id) {
    try {
      await JsonServer.deleteTaskInDb(id);
      const filteredTasks = tasks.filter((t) => t.id !== id);
      setTasks((tasks) => filteredTasks);
    } 
    catch (error) {
      //console.error(`Erreur attrapée handleClickDelete`);
      setError(error);
      loadTasks();
    }
  }

  async function addTask(title) {
    //console.log('dans add task');
    await JsonServer.addTaskInDb(title);
    // TODO ajouter dans liste et setTasks()
    const id = getMaxId(tasks) + 1;
    const newTask = { id: id, title: title, done: false };
    const copy_tasks = [...tasks];
    copy_tasks.push(newTask);
    setTasks((tasks) => copy_tasks);
  }

async function loadTasks() {
    const tasksLoaded = await JsonServer.loadTasks();
    setTasks((tasks) => tasksLoaded);
  }

  function getMaxId(tasks) {
    let max = -Number.MAX_VALUE;
    tasks.forEach((t) => {
      if (t.id > max) max = t.id;
    });
    return max;
  }

  async function editTask(idTask) {
    const task = await JsonServer.getTaskById(idTask);
    console.log('task :', task);
  }

  return (
    <div className="App container">
      <h1 className="mt-5 h1 text-center">Gestion des tâches</h1>
      {error && <h2 className="text-danger">{error}</h2>}
      <FormAddTask addTask={addTask} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          editTask={editTask}
          changeDone={changeDone}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default App;
