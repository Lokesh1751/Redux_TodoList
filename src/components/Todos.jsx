import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../features/todo/todoSlice";
import { FaTrash, FaEdit } from "react-icons/fa";

function Todos() {
  const [input, setInput] = useState("");
  const [updatedTodoId, setUpdatedTodoId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (updatedTodoId) {
      dispatch(updateTodo({ id: updatedTodoId, newText: input }));
      setUpdatedTodoId(null);
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  };

  const handleUpdate = (todo) => {
    setInput(todo.textValue);
    setUpdatedTodoId(todo.id);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Todo List
        </h1>
        <form onSubmit={handleAddTodo} className="mb-6 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a todo"
            className="flex-1 p-2 border border-gray-300 rounded-l-lg outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-lg font-bold hover:bg-blue-600"
          >
            {updatedTodoId ? "Update" : "Add"}
          </button>
        </form>

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md"
            >
              <h1 className="text-lg font-semibold text-gray-700">
                {todo.textValue}
              </h1>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTrash size={20} />
                </button>
                <button
                  onClick={() => handleUpdate(todo)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400"
                >
                  <FaEdit size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todos;
