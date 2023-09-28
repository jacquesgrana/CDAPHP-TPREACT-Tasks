//import logo from './logo.svg';
//import './App.css';

import { useState, useEffect } from "react";
import Task from "./Task";
import JsonServer from "../services/JsonServer";
import FormAddTask from "./FormAddTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  //let titleForm = "Ajouter une tâche";
  const [titleForm, setTitleForm] = useState("Ajouter une tâche");
  //let inputValueForm = "";
  const [inputValueForm, setInputValueForm] = useState("");
  //let mode = "create";
  const [mode, setMode] = useState("create");
  const [taskId, setTaskId] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        loadTasks();
      } catch (error) {
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
    copy_tasks.sort((a, b) => a.done - b.done); //Number(a.done) - Number(b.done)
    setTasks((tasks) => copy_tasks);
  }

  async function deleteTask(id) {
    try {
      await JsonServer.deleteTaskInDb(id);
      const filteredTasks = tasks.filter((t) => t.id !== id);
      setTasks((tasks) => filteredTasks);
    } catch (error) {
      setError(error);
      loadTasks();
    }
  }

  async function addTask(title, mode) {
    if (mode === "create") {
      await JsonServer.addTaskInDb(title);
      const id = getMaxId(tasks) + 1;
      const newTask = { id: id, title: title, done: false };
      const copy_tasks = [...tasks];
      copy_tasks.push(newTask);
      setTasks((tasks) => copy_tasks);
      setInputValueForm("");
    } else if (mode === "edit") {
      await JsonServer.patchTaskInDb(taskId, title);
      const tasksCopy = [...tasks];
      tasksCopy.forEach((t) => {
        if (t.id === taskId) t.title = title;
      });
      setTasks((tasks) => tasksCopy);
      setTitleForm("Ajouter une tâche");
      setInputValueForm("");
      setMode("create");
    }
  }

  async function loadTasks() {
    const tasksLoaded = await JsonServer.loadTasks();
    tasksLoaded.sort((a, b) => a.done - b.done);
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
    //console.log('task :', task);
    setMode("edit");
    setTitleForm("Editer une tâche");
    setInputValueForm(task.title);
    setTaskId(idTask);
  }

  return (
    <div className="App container">
      <h1 className="mt-5 h1 text-center">Gestion des tâches</h1>
      {error && <h2 className="text-danger">{error}</h2>}
      <FormAddTask
        taskId={taskId}
        mode={mode}
        titleForm={titleForm}
        inputValueForm={inputValueForm}
        addTask={addTask}
      />
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
