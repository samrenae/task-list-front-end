import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';

  const fetchAllTasks = () => {
    axios.get(URL)
    .then((res) => {
      const sortedTasks = res.data.sort((a, b) => (a.id > b.id) ? 1 : -1);
      const tasksAPIResCopy = sortedTasks.map((task) => {
        return{
          ...task,
          isComplete: task.is_complete
        };
      });
      setTaskList(tasksAPIResCopy);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  useEffect(fetchAllTasks, []);

  const updateComplete = (taskId, updatedStatus) => {
    console.log(`${taskId}, ${updatedStatus}`);
    let markTask = '';
    if (updatedStatus === true) {
      markTask = 'mark_complete';
    } else if (updatedStatus === false){
      markTask = 'mark_incomplete';
    }
    const newTaskList = [];
    // if (updatedStatus === 'true') {
      axios.patch( `${URL}/${taskId}/${markTask}`)
      .then(() => {
        for (const task of taskList) {
          if (task.id !== taskId){
            newTaskList.push(task);
          } else {
            const newTask = {
              ...task,
              isComplete: updatedStatus
            };
            newTaskList.push(newTask);
          }
        }
        setTaskList(newTaskList);
      })
      .catch((err) => {
        console.log(err);
      });
    // } else {
    //   axios.patch( `${URL}/${taskId}/mark_incomplete`)
    //   .then(() => {
    //     for (const task of taskList) {
    //       if (task.id !== taskId){
    //         newTaskList.push(task);
    //       } else {
    //         const newTask = {
    //           ...task,
    //           isComplete: updatedStatus
    //         };
    //         newTaskList.push(newTask);
    //       }
    //     }
    //     setTaskList(newTaskList);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
      
  };

  const deleteTask = (taskId) => {
    axios.delete(`${URL}/${taskId}`)
    .then(() => {
      const newTaskList = [];
      for (const task of taskList){
        if (task.id !== taskId) {
          newTaskList.push(task);
        }
      }
      setTaskList(newTaskList);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const addTask = (newTaskInfo) => {
    axios.post(URL, newTaskInfo)
    .then((response) => {
      fetchAllTasks();
    //   const newTasks = [...taskList];
    //   const newTaskJSON = {
    //     ...newTaskInfo,
    //     'id': response.data.id
    //   };
    //   newTasks.push(newTaskJSON);
    //   setTaskList(newTasks);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList tasks={taskList} updateComplete={updateComplete}  deleteTask={deleteTask}/>}
          <NewTaskForm addTaskCallback={addTask}/>
        </div>
      </main>
    </div>
  );
};

export default App;
