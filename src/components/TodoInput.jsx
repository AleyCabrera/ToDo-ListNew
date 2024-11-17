import React, { useState } from "react";
import "../styles/styles.css";

function TodoInput({ addTask }) {
    const [task, setTask] = useState("");
    const [dueDate, setDueDate] = useState("");

    function handleAdd() {
        if (!task.trim()) return;
        addTask(task, dueDate);
        setTask("");
        setDueDate("");
    }

    return (
        <div className="input">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <button onClick={handleAdd} className="bt">Add Task</button>

        </div>
        
    );
}

export default TodoInput;