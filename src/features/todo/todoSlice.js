import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        textValue: action.payload,
        complete:false
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.textValue = newText;
      }
    },
    clearTodo: (state) => {
      state.todos = [];
    },
    completeornot:(state,action)=>{
      const id=action.payload;
      const todo=state.todos.find((todo)=>todo.id===id);
      if(todo){
        todo.complete=!todo.complete
      }
    }
  },
});
export const { addTodo, removeTodo, updateTodo, clearTodo ,completeornot } = todoSlice.actions;
export default todoSlice.reducer;
