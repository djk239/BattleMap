// src/mockData.js
const stateNames = [
    "AL", "AK", "AZ", "AR", "CA", "CO", 
    "CT", "DE", "FL", "GA", "HI", "ID", 
    "IL", "IN", "IA", "KS", "KY", "LA", 
    "ME", "MD", "MA", "MI", "MN", 
    "MS", "MO", "MT", "NE", "NV", 
    "NH", "NJ", "NM", "NY", 
    "NC", "ND", "OH", "OK", "OR", 
    "PA", "RI", "SC", "SD", 
    "TN", "TX", "UT", "VT", "VA", "WA", 
    "WV", "WI", "WY"
  ];
  
  export const mockData = stateNames.map((state, index) => ({
    id: index + 1,
    name: state,
    def: Math.floor(Math.random() * 1000000) + 500000, // Random between 500k and 1.5M
    atk: Math.floor(Math.random() * 50000) + 10000,   // Random between 10k and 60k
    daily: Math.floor(Math.random() * 10000) + 5000,  // Random between 5k and 15k
    replenish: Math.floor(Math.random() * 700000) + 300000 // Random between 300k and 1M
  }));
  