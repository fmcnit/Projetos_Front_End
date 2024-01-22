import styles from './App.module.css'
import React, { useState } from 'react';

import TaskForm from "./components/TaskForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from './components/TaskList';
import Modal from './components/Modal';

import { Itask } from "./interfaces/ITask";


function App() {

  const [taskList, setTaskList] = useState<Itask[]>([])
  const [taskUpdate, setTaskUpdate] = useState<Itask | null>(null)

  const deleteTask = (id: number) =>{
    setTaskList(
      taskList.filter(task =>{
        return task.id !== id
      })
    )
  }
  const hideOrShowModal = (display: boolean) =>{
    const modal = document.querySelector('#modal')
    if (display) {
      modal!.classList.remove("hide")
    } else{
      modal!.classList.add("hide")
    }
  }

  const editTask =(task: Itask):void =>{
    hideOrShowModal(true)
    setTaskUpdate(task)
  }

  const updateTask = (id:number, title:string, difficulty:number) =>{
    const updatedTask: Itask = {id, title, difficulty}

    const updatedItens = taskList.map((task) =>{
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItens)

    hideOrShowModal(false)
  }



  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText="Editar Tarefa"
            taskList={taskList}
            task={taskUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />

      <main className={styles.main}>
        <TaskForm
          btnText="Criar Tarefas"
          taskList={taskList}
          setTaskList={setTaskList}
        />
        <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
      </main>

      <Footer />
    </div>
  );
}

export default App;
