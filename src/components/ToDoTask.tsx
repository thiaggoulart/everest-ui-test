import Task from '../types/task'
import "./ToDoTask.css";
import deleteLogo from "../assets/delete.svg";

function ToDoTask({task, deleteTask, isChecked}: {task: Task, deleteTask: (id: number) => void, isChecked: (id: number) => void}) {

  function deleteToDo(id: number){
    deleteTask(id);
  }

  function verifyChecked(id: number){
    return isChecked(id);
  }

  return (
    <>
    <div className='container'>
      <div className='task-container'>
        <input type='checkbox' checked={task.checked} onChange={() => verifyChecked(task.id)}></input>
        <div className='content-box'>
          {task.content} 
        </div>
        <button className='delete-button' onClick={() => deleteToDo(task.id)}>< img src={deleteLogo} alt="delete logo" /></button> 
    </div>   
    </div>
    </>
  )
}

export default ToDoTask
