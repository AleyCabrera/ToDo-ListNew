import React, { useEffect, useState } from 'react';
import TodoInput from '../src/components/TodoInput.jsx';
import TodoList from '../src/components/TodoList.jsx';
import logo from '../src/assets/image/to-do-list-nex-logo.png';
import '../src/styles/styles.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().catch(() => {
        console.log('Permiso de notificación denegado.');
      });
    }
  }, []);

  useEffect(() => {
    if (Notification.permission === "granted") {
      const now = new Date();
      tasks.forEach(task => {
        if (task.dueDate && !task.completed) {
          const dueDate = new Date(task.dueDate);
          const timeLeft = dueDate - now;

            if (timeLeft > 0 && timeLeft <= 24 * 60 * 60 * 1000) {
              new Notification("Plazo cercano", {
                body: `La tarea "${task.text}" vence pronto.`,
              });
            }
        }
      });
    }
  }, [tasks]);

  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';  
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  function addTask(task, dueDate) {
    setTasks([...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        dueDate,
      }
    ]);
  };

  function toggleComplete(id) {
    setTasks(tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      })
    );
  };

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const [filter, setFilter] = useState('all');

  function filterTasks() {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }

  const [sortOrder, setSortOrder] = useState('date');

  function sortedTasks(e) {
    const sorted = [...filterTasks(e)];
    if (sortOrder === 'priority') {
      return sorted.sort((a, b) => b.priority - a.priority);
    }
    return sorted.sort((a, b) => b.id - a.id);
  }

  const progress = tasks.length ? (tasks.filter(task => task.completed).length / tasks.length) * 100
  : 0;

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div>
      <header className='header'>
        <button  className='theme-toggle' onClick={toggleTheme}>
          {theme === 'light' ? <i className='fas fa-moon'></i> : <i className='fas fa-sun'></i>}</button>
        <img src={logo} alt='logo' />
        <h1 className='tareas'>MIS TAREAS POR HACER!</h1>
      </header>
      
      <TodoInput addTask={addTask} />

      <div>
        <p className='status'>{tasks.length === 0 ? 'No tienes taresas pendientes.' : `${completedCount} completadas de ${tasks.length} tareas`}</p>
      </div>

      <div className='filters'>
        <button onClick={() => setFilter('all')}>Todos</button>
        <button onClick={() => setFilter('completed')}>Completado</button>
        <button onClick={() => setFilter('pending')}>Pendiente</button>

        <button onClick={() => setSortOrder('date')}>Ordenar por fecha</button>
        <button onClick={() => setSortOrder('priority')}>Ordenar por prioridad</button>
      </div>

      

      <div className="progress-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>

      <TodoList tasks={sortedTasks()} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
