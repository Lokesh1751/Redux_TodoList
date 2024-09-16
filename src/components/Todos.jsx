import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  updateTodo,
  clearTodo,
  completeornot,
} from "../features/todo/todoSlice";
import { FaTrash, FaEdit } from "react-icons/fa";

function Todos() {
  const [input, setInput] = useState("");
  const [updatedTodoId, setUpdatedTodoId] = useState(null);
  const dispatch = useDispatch();
  let todos = useSelector((state) => state.todos);
  const [searchQuery, setsearchQuery] = useState("");

  const handleAddTodo = (e) => {
    if (input) {
      if (updatedTodoId) {
        dispatch(updateTodo({ id: updatedTodoId, newText: input }));
        setUpdatedTodoId(null);
      } else {
        dispatch(addTodo(input));
      }
      setInput("");
    } else {
      alert("Add a todo first!!");
    }
  };

  const handleUpdate = (todo) => {
    setInput(todo.textValue);
    setUpdatedTodoId(todo.id);
  };
  const filteredTodos = todos.filter((todo) =>
    todo.textValue.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex items-center justify-center h-screen  bg-gray-100">
      <div className="bg-white p-6 rounded-lg  shadow-lg w-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Todo List
        </h1>
        <form
          onSubmit={handleAddTodo}
          className="mb-6 flex flex-col gap-4 items-center justify-center"
        >
          <div>
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
            <button
              className="bg-blue-500 text-white p-2 ml-4 rounded-r-lg font-bold hover:bg-blue-600"
              onClick={() => dispatch(clearTodo())}
            >
              Clear
            </button>
          </div>
          <input
            type="text"
            placeholder="Search todo"
            className="p-2 border border-gray-300  rounded-lg w-full"
            onChange={(e) => setsearchQuery(e.target.value)}
          />
        </form>

        <div className="space-y-4">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md"
              >
                <h1
                  className={`text-lg font-semibold ${
                    todo.complete ? "line-through" : ""
                  } text-gray-800`}
                >
                  {todo.textValue.toUpperCase()}
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
                  <button>
                    <input
                      type="checkbox"
                      className="w-5  mt-2 h-5"
                      checked={todo.complete}
                      onClick={() => dispatch(completeornot(todo.id))}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">List is empty</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todos;
