import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // todo listesi
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setTodos, setLoading, setError } = todoSlice.actions;

export default todoSlice.reducer;