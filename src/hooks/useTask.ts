import { useEffect, useState } from "react"
import Task from "../types/task"

function useTask(toDoList: Task[]) {

    const [tasks, setTasks] = useState(toDoList)
    useEffect(() => {
      fetch("https://everest-interview-public-files.s3.amazonaws.com/input.json").then((response) => {
        return response.json();
      }).then((data) => {
        let initialToDoList: Task[] = [];
        data.todos.forEach((el: any) => {
            if(typeof(el.checked) === "boolean" && typeof(el.content) === "string" && typeof(el.id) === "number"){
              initialToDoList.push(el);
            }
          return initialToDoList;
        })
        setTasks(initialToDoList);
      })
    }, []);
    
    function addTask(content: string) {
      setTasks((actualValues: Task[]) => {
        return [...actualValues, {id: (actualValues.length == 0 ? 1 : (actualValues.at(-1)!.id + 1)), "content": content, checked: false}]
      });
    }

    function deleteTask(id: number) {
      setTasks((actualValues: Task[]) => {
        let removedTask = actualValues.findIndex((task:Task) => {
          return task.id == id;
        })
        let auxToDoList: Task[] = [...actualValues];
        auxToDoList.splice(removedTask, 1);
        let newToDoList: Task[] = [];
        auxToDoList.forEach(el => newToDoList.push(el));
        return newToDoList;
      });
    }

    function isChecked(id: number){
      setTasks((actualValues: Task[]) => {
        let checkedChange = actualValues.findIndex((task:Task) => {
          return task.id == id;
        })
        let newToDoList: Task[] = [...actualValues];
        newToDoList[checkedChange] = {...actualValues[checkedChange], checked: !newToDoList[checkedChange].checked};
        return newToDoList;
      });
    }
    
    return {tasks, addTask, deleteTask, isChecked}
  }
  
  export default useTask