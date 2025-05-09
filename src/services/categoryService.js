import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const fetchCategory = async (id) => {
  const response = await axios.get(`${API_URL}/categories/${id}`);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await axios.post(`${API_URL}/categories`, data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await axios.put(`${API_URL}/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/categories/${id}`);
  return response.data;
};

export const fetchCategoryTodos = async (id) => {
  const response = await axios.get(`${API_URL}/categories/${id}/todos`);
  return response.data;
};