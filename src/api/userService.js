import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
if (!API_BASE_URL) {
  throw new Error('Missing VITE_API_URL in environment');
}
const API_URL = `${API_BASE_URL}/users`;

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Admin functions
export const getUsers = async (token, pageNumber = '') => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}?pageNumber=${pageNumber}`, config);
  return response.data;
};

export const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};
