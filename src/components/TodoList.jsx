import React from "react";
import TodoItem from "./TodoItem";
import "../styles/styles.css";

function TodoList({ tasks, toggleComplete, deleteTask }) {
    return (
        <div className="task-container">
            <div>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <TodoItem
                                task={task}
                                toggleComplete={toggleComplete}
                                deleteTask={deleteTask}
                        />
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>No tasks</p>   
                )}
                
            </div>
        </div>
        
    );
}

export default TodoList;