import axios from '../utils/axiosInstance';

export const fetchTodos = async (params = {}) => {
  const response = await axios.get('/todos', { params });
  return response.data;
};

export const fetchTodoById = async (id) => {
  const response = await axios.get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (data) => {
  const response = await axios.post('/todos', data);
  return response.data;
};

export const updateTodo = async (id, data) => {
  const response = await axios.put(`/todos/${id}`, data);
  return response.data;
};

export const updateTodoStatus = async (id, newStatus) => {
  const response = await axios.patch(`/todos/${id}/status`, {
    status: newStatus,
  });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`/todos/${id}`);
  return response.data;
};

export const searchTodos = async (query, pagination = {}) => {
  const response = await axios.get('/todos/search', {
    params: { q: query, ...pagination }
  });
  return response.data;
};

export const fetchUpcomingTodos = async () => {
  const response = await axios.get('/todos', {
    params: { due_soon: true },
  });
  return response.data;
};
