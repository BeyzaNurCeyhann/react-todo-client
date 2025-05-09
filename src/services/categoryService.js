import axios from '../utils/axiosInstance'; 

export const fetchCategories = async () => {
  const response = await axios.get('/categories');
  return response.data;
};

export const fetchCategory = async (id) => {
  const response = await axios.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await axios.post('/categories', data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await axios.put(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`/categories/${id}`);
  return response.data;
};

export const fetchCategoryTodos = async (id) => {
  const response = await axios.get(`/categories/${id}/todos`);
  return response.data;
};
