import React, { useState } from "react";
import "./App.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTodoText, setUpdatedTodoText] = useState("");

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleCreateTodo = () => {
    if (todoText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: todoText,
      };

      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todoId, todoText) => {
    setEditingTodoId(todoId);
    setUpdatedTodoText(todoText);
  };

  const handleUpdateTodo = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, text: updatedTodoText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setUpdatedTodoText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCreateTodo();
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="todo-inputs">
        <input
          type="text"
          value={todoText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a todo"
        />
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="todo-card">
          {editingTodoId === todo.id ? (
            <div>
              <input
                type="text"
                value={updatedTodoText}
                onChange={(event) => setUpdatedTodoText(event.target.value)}
              />
              <button onClick={() => handleUpdateTodo(todo.id)}>Save</button>
            </div>
          ) : (
            <div>
              <div className="todo-text">
                <strong>{todo.text}</strong>
              </div>
              <div className="todo-actions">
                <button onClick={() => handleEditTodo(todo.id, todo.text)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
