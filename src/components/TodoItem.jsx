import React, { useState } from "react";
import "../styles/styles.css";

function TodoItem({ task, toggleComplete, deleteTask }) {
    /**
     * Verifica si una tarea está vencida.
     *
     * @param {string} taskDueDate - La fecha de vencimiento de la tarea en formato de cadena.
     * @returns {boolean} - Devuelve `true` si la tarea está vencida, de lo contrario `false`.
     */
    const isOverdue = (taskDueDate) => {
        if (!taskDueDate) return false;
        const dueDate = new Date(taskDueDate);
        const now = new Date();
        return now.getTime() > dueDate.getTime();
    }
    const [isRemoving, setIsRemoving] = useState(false);

    function handleDelete() {
        setIsRemoving(true);
        setTimeout(() => deleteTask(task.id), 500);
    }

    return (
        <div>
            <div className={`task-item ${isRemoving ? "removing" : ""}`} id={`task-${task.id}`}>
                <div className={isOverdue ? "overdue" : ""}>
                    <h3 className={`task-title ${task.completed ? "completed" : ""}`}>{task.text}</h3>
                    {task.dueDate && <p className="task-date">{task.dueDate}</p>}

                    <button onClick={() => toggleComplete(task.id)}><i className="fas fa-check"></i></button> 

                    <span className={task.completed ? "completed" : ''} onClick={() => toggleComplete(task.id)}></span>

                    <button onClick={handleDelete}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;