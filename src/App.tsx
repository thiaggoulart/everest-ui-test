import { FC, useState } from "react";
import everestLogo from "../public/everest-logo.svg";
import "./App.css";
import useTask from "./hooks/useTask";
import ToDoTask from "./components/ToDoTask";
import Task from "./types/task";
import AddTask from "./components/AddTask";

const App: FC = () => {

  let[errorMessage, setErrorMessage] = useState(false);
  const tasks = useTask([]);
  let completedTasks: JSX.Element[] = [];
  let incompletedTasks: JSX.Element[] = [];

  tasks.tasks.forEach((task: Task) => {
    task.checked === true ?
      completedTasks.push(<ToDoTask task={task} deleteTask={tasks.deleteTask} isChecked={tasks.isChecked}></ToDoTask>)
      :
      incompletedTasks.push(<ToDoTask task={task} deleteTask={tasks.deleteTask} isChecked={tasks.isChecked}></ToDoTask>)
      ;
  })
  return (
    <div className="everest-app">
      <div className="header">
        <h1 className="everest-app__title">< img className="everest-app__logo" src={everestLogo} alt="Everest logo" /> TODO App Challenge</h1>
      </div>
      <div>
        <AddTask addTaskFunciton={tasks.addTask} errorMessage={setErrorMessage}></AddTask>
        {
          (errorMessage === true) &&
          (<p className="error-message">*The task must have at least 1 character</p>)
        }
      </div>
      {(incompletedTasks.length > 0) &&
        (<div>
          <div className="title-container">
            <h2 className="task-title">Incompleted Tasks</h2>
          </div>
          {incompletedTasks}
        </div>)
      }
      {(completedTasks.length > 0) &&
        (<div>
          <div className="title-container">
            <h2 className="task-title">Completed Tasks</h2>
          </div>
          {completedTasks}
        </div>)
      }
      {(completedTasks.length == 0 && incompletedTasks.length == 0) &&
        (<div>
          <h2>Please add new tasks</h2>
        </div>)
      }
    </div>
  );
}

export default App;
