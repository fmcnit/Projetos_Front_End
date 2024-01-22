import React from "react";
import { Itask } from "../interfaces/ITask";
import styles from "./TaskList.module.css";

type Props = {
  taskList: Itask[];
  handleDelete(id: number): void;
  handleEdit(task: Itask): void;
};

const TaskList = ({ taskList, handleDelete, handleEdit }: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <small>Dificuldade:{task.difficulty}</small>
            </div>
            <div className={styles.actions}>
              <i className="bi bi-pencil" onClick={() => {handleEdit(task)}}></i>
              <i
                className="bi bi-trash"
                onClick={() => {
                  handleDelete(task.id);
                }}></i>
            </div>
          </div>
        ))
      ) : (
        <p>Não Há Tarefas para Mostrar</p>
      )}
    </>
  );
};

export default TaskList;
