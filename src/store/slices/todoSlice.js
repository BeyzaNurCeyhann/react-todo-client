import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  meta: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action) {
      state.items = action.payload;
    },
    setMeta(state, action) {
      state.meta = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    updateTodoStatusLocally(state, action) {
      const updated = action.payload;
      const index = state.items.findIndex((todo) => todo.id === updated.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...updated,
        };
      }
    },
    removeTodo(state, action) {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
  },
});


export const {
  setTodos,
  setMeta,
  setLoading,
  setError,
  updateTodoStatusLocally,
  removeTodo,
} = todoSlice.actions;

export default todoSlice.reducer;