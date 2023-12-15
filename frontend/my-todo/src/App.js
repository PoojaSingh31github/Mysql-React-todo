import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/alltask');
      console.log(response);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (inputText.trim() !== '') {
      try {
        await axios.post('http://localhost:5000/addtask', { task: inputText });
        setInputText('');
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/deletetask/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
    <div className="main-container">
      <h1 className="app-heading">TODO</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-box-todo"
          placeholder="Enter your todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTask}>+</button>
        {tasks.map(p => (
          <div key={p.id} className="task-item">
            <h3 className="list-item  ">{p.lists} <i class="fa-solid fa-trash icons"onClick={() => handleDeleteTask(p.id)}></i> </h3>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default App;
