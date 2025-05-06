import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const fetchTodos = async (params = {}) => {
  const response = await axios.get(`${API_URL}/todos`, { params });
  return response.data;
};

export const fetchTodoById = async (id) => {
  const response = await axios.get(`${API_URL}/todos/${id}`);
  return response.data;
};

export const createTodo = async (data) => {
  const response = await axios.post(`${API_URL}/todos, data`);
  return response.data;
};

export const updateTodo = async (id, data) => {
  const response = await axios.put(`${API_URL}/todos/${id}, data`);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/todos/${id}`);
  return response.data;
};

export const searchTodos = async (query) => {
    const response = await axios.get(`${API_URL}/todos/search`, {
      params: { q: query },
    });
    return response.data;
  };