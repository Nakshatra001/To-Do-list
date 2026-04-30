import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("low");
  const [reminder, setReminder] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todo");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Enter task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text,
      desc: desc,
      priority: priority,
      reminder: reminder,
      completed: false,
      fav: false,
    };

    setTasks([...tasks, newTask]);

    setText("");
    setDesc("");
    setPriority("low");
    setReminder("");
  };

  const deleteTask = (id) => {
    let newList = tasks.filter((t) => t.id !== id);
    setTasks(newList);
  };

  const toggleComplete = (id) => {
    let updated = tasks.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTasks([...updated]);
  };

  const toggleFav = (id) => {
    let updated = tasks.map((t) => {
      if (t.id === id) {
        t.fav = !t.fav;
      }
      return t;
    });
    setTasks([...updated]);
  };

  return (
    <div className="App">
      <h1>To-do App</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />

        <button>Add</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <div>
              <span
                onClick={() => toggleComplete(t.id)}
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {t.text}
              </span>

              <p>{t.desc}</p>
              <small>Priority: {t.priority}</small>
              <br />
              <small>Reminder: {t.reminder}</small>
            </div>

            <div>
              <button onClick={() => toggleFav(t.id)}>
                {t.fav ? "⭐" : "☆"}
              </button>

              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;