// src/services/api.js
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.1.172:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch a single state by it's name
export const fetchState = async (name) => {
  try {
    const response = await api.get(`/states/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching state:', error);
    throw error;
  }
};

// Create deployment object
export const createDeployment = async (data) => {
  try {
    const token = await getAccessToken(); // Fetch the token

    const response = await api.post(`/deployments/create/`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred while deploying";
  }
};

// signup
export const signup = async (userInfo) => {
  try {
      const response = await api.post(`/signup/`, userInfo);
      
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};

// login function
export const login = async (credentials) => {
  try {
      console.log("Sending Credentials:", credentials); // Debugging log
      const response = await api.post(`/login/`, credentials);

      const { access, refresh } = response.data;

      const decodedToken = jwtDecode(access);
      const expTime = decodedToken.exp * 1000;     
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('expTime', expTime);
      
      return response.data;
  } catch (error) {
      throw error.response.data;
  }
};

export const getUserProfile = async () => {
  try {
      const token = await getAccessToken();
      
      const response = await api.get(`/me/`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
  }
};

export const getTopByLevel = async (name) => {
  try {
    const response = await api.get(`/users/top/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top 10:', error);
    throw error;
  }
};

const isAccessTokenExpired = () => {
  const expirationTime = localStorage.getItem('expTime');
  if (!expirationTime) {
    return true; // No expiration time found, consider expired
  }
  
  const now = new Date().getTime();
  return now > expirationTime; // Return true if current time is after expiration time
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post(
      `/token/refresh/`, {refresh: refreshToken}
    );

    const { access, refresh } = response.data;

    // Update tokens in localStorage
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    const decodedToken = jwtDecode(access);
    const expTime = decodedToken.exp * 1000;
    localStorage.setItem('expTime', expTime);

    return access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export const getAccessToken = async () => {
  let token = localStorage.getItem('accessToken');
  const expirationTime = localStorage.getItem('expTime');

  if (!token || !expirationTime || isAccessTokenExpired()) {
    // Token is expired or not available, refresh it
    try {
      token = await refreshAccessToken();
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
  return token;
};

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expTime');
};
