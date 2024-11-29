import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState(""); // For storing the current input
  const [todos, setTodos] = useState([]); // For storing the list of todos

  // Handle adding a todo
  const addTodo = () => {
    if (todo.trim() === "") return; // Prevent empty todos
    setTodos([...todos, todo]);
    setTodo(""); // Clear the input field
  };

  // Handle deleting a todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do App</h1>

        {/* Input Field */}
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
            placeholder="Add a new task"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
        </div>

        {/* To-Do List */}
        <ul className="list-none space-y-2">
          {todos.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded shadow-sm"
            >
              <span>{task}</span>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* No Tasks Message */}
        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks added yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
