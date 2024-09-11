import { useState } from "react"
import add from "../assets/add.svg";
import "./AddTask.css";


function AddTask({addTaskFunciton, errorMessage}: {addTaskFunciton: (content:string) => void, errorMessage: (isEmpty:boolean) => void}) {
    let [inputValue, setInputValue] = useState('');

    function onInputChange(e:React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target?.value)
    }

    function insertTask() {
        if(inputValue.length > 0){
            addTaskFunciton(inputValue);
            setInputValue('');
            errorMessage(false);
        } else {
            setInputValue('');
            errorMessage(true);
        }
    }
  return (
    <>
      <div className="container">
        <div className="add-container">
          <input className="input-task" placeholder="Please add your new task" onChange={onInputChange} value={inputValue} onKeyDown={(e) => {
            if (e.key === "Enter")
              insertTask();
          }}></input>
          <button className="add-button" onClick={insertTask}>< img src={add} alt="add icon" /> <span>Add Task</span></button>
        </div>
      </div>
    </>
  )
}

export default AddTask
