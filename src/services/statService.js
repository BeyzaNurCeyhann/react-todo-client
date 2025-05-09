import axios from '../utils/axiosInstance';

export const fetchStatusStats = async () => {
  const response = await axios.get('/stats/todos'); 
  return response.data;
};

export const fetchPriorityStats = async () => {
  const response = await axios.get('/stats/priorities'); 
  return response.data;
};
