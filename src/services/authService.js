import axios from '../utils/axiosInstance';

export const login = async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
};

export const register = async (data) => {
    const response = await axios.post('/auth/register', data);
    return response.data;
};

export const fetchMe = async () => {
    const response = await axios.get('/auth/me');
    return response.data;
};

export const logout = async () => {
    const response = await axios.post('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
};
