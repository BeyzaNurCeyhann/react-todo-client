import axios from 'axios';

const API_URL = 'http://localhost:8000/api/categories';

export const fetchCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchCategory = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchCategoryTodos = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/todos`);
  return response.data;
};