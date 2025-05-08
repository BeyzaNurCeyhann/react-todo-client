import axios from 'axios';

const API_URL = 'http://localhost:8000/api/stats';

export const fetchStatusStats = async () => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const fetchPriorityStats = async () => {
  const response = await axios.get(`${API_URL}/priorities`);
  return response.data;
};