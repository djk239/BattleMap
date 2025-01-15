// src/services/api.js
import { mockData } from "../mockdata/mockData";

// Function to fetch all states
export const fetchStates = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
};

// Function to fetch a state by its ID
export const fetchStateById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const state = mockData.find((s) => s.id === id);
      if (state) {
        resolve(state);
      } else {
        reject(new Error('State not found'));
      }
    }, 500);
  });
};

// Function to fetch a state by its name
export const fetchStateByName = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const state = mockData.find((s) => s.name.toLowerCase() === name.toLowerCase());
      if (state) {
        resolve(state);
      } else {
        reject(new Error('State not found'));
      }
    }, 500);
  });
};
