import React, { useState, ChangeEvent, FormEvent, useEffect, ChangeEventHandler } from 'react'
import styles from './TaskForm.module.css'

import { Itask } from "../interfaces/ITask";


type Props = {
  btnText: string;
  taskList: Itask[];
  setTaskList?: React.Dispatch<React.SetStateAction<Itask[]>>;
  task?: Itask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
};

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {

    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>('');
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(()=>{
        if(task){
            setId(task.id)
            setTitle(task.title)
            setDifficulty(task.difficulty)
        }
    },[task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (handleUpdate) {
            handleUpdate(id, title, difficulty)
            
        } else{
            const id = Math.floor(Math.random() * 1000);

            const newTask: Itask = { id, title, difficulty };

            setTaskList!([...taskList, newTask]);

            setTitle("");
            setDifficulty(0);

        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        if (e.target.name === "title"){
            setTitle(e.target.value)

        } else {
            setDifficulty(parseInt(e.target.value))

        }
    }
    console.log(setTaskList)

  return (
    <div>
        <form onSubmit={addTaskHandler} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor="title">Título:</label>
                <input 
                type="text" 
                name='title'
                placeholder='Digite a tarefa'
                onChange={handleChange}
                value={title}
                />
            </div>
            <div className={styles.input_container}>
                <label htmlFor="difficulty">Dificuldade: </label>
                <input 
                type="number" 
                name='difficulty' 
                placeholder='Dificuldade da Tarefa'
                onChange={handleChange}
                value={difficulty}
                
                />
            </div>
            <input type="submit" value={btnText}/>
        </form>
    </div>
  )
}

export default TaskForm