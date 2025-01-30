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

const stateNeighbors = {
  AL: ["FL", "GA", "TN", "MS"],
  AK: ["HI", "WA", "OR", "CA"],
  AZ: ["CA", "NV", "UT", "NM"],
  AR: ["MO", "TN", "MS", "LA", "TX", "OK"],
  CA: ["OR", "NV", "AZ"],
  CO: ["WY", "NE", "KS", "OK", "NM", "UT"],
  CT: ["NY", "MA", "RI"],
  DE: ["MD", "PA", "NJ"],
  FL: ["AL", "GA"],
  GA: ["FL", "AL", "TN", "NC", "SC"],
  HI: ["AK", "WA", "OR", "CA"],
  ID: ["MT", "WY", "UT", "NV", "OR", "WA"],
  IL: ["WI", "IN", "KY", "MO", "IA"],
  IN: ["MI", "OH", "KY", "IL"],
  IA: ["MN", "WI", "IL", "MO", "NE", "SD"],
  KS: ["NE", "MO", "OK", "CO"],
  KY: ["IN", "OH", "WV", "VA", "TN", "MO", "IL"],
  LA: ["AR", "MS", "TX"],
  ME: ["NH"],
  MD: ["PA", "DE", "VA", "WV"],
  MA: ["NY", "VT", "NH", "RI", "CT"],
  MI: ["WI", "IN", "OH"],
  MN: ["WI", "IA", "SD", "ND"],
  MS: ["TN", "AL", "LA", "AR"],
  MO: ["IA", "IL", "KY", "TN", "AR", "OK", "KS", "NE"],
  MT: ["ND", "SD", "WY", "ID"],
  NE: ["SD", "IA", "MO", "KS", "CO", "WY"],
  NV: ["OR", "ID", "UT", "AZ", "CA"],
  NH: ["VT", "ME", "MA"],
  NJ: ["NY", "PA", "DE"],
  NM: ["CO", "OK", "TX", "AZ"],
  NY: ["VT", "MA", "CT", "NJ", "PA"],
  NC: ["VA", "SC", "GA", "TN"],
  ND: ["MN", "SD", "MT"],
  OH: ["MI", "IN", "KY", "WV", "PA"],
  OK: ["KS", "MO", "AR", "TX", "NM", "CO"],
  OR: ["WA", "ID", "NV", "CA"],
  PA: ["NY", "NJ", "DE", "MD", "WV", "OH"],
  RI: ["MA", "CT"],
  SC: ["NC", "GA"],
  SD: ["ND", "MN", "IA", "NE", "WY", "MT"],
  TN: ["KY", "VA", "NC", "GA", "AL", "MS", "AR", "MO"],
  TX: ["OK", "AR", "LA", "NM"],
  UT: ["ID", "WY", "CO", "AZ", "NV"],
  VT: ["NY", "NH", "MA"],
  VA: ["MD", "WV", "KY", "TN", "NC"],
  WA: ["ID", "OR"],
  WV: ["PA", "MD", "VA", "KY", "OH"],
  WI: ["MI", "MN", "IA", "IL"],
  WY: ["MT", "SD", "NE", "CO", "UT", "ID"]
};

export const mockData = stateNames.map((state, index) => ({
  id: index + 1,
  name: state,
  owner: state, // Setting owner as the state name
  neighbors: stateNeighbors[state], // Adding neighbors array
  def: Math.floor(Math.random() * 1000000) + 500000, // Random between 500k and 1.5M
  atk: Math.floor(Math.random() * 50000) + 10000,   // Random between 10k and 60k
  daily: Math.floor(Math.random() * 10000) + 5000,  // Random between 5k and 15k
  replenish: Math.floor(Math.random() * 700000) + 300000 // Random between 300k and 1M
}));
  
  export const mockAccounts = [
    {
        id: 1,
        pfp: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg",
        username: "Guest",
        level: 100,
        email: "halotv@example.com",
        notifications: true,
        homestate: "CA",
        trooppool:Math.floor(Math.random() * 10000) + 5000,  // Random between 5k and 15k
    },
    {
        id: 2,
        pfp: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        username: "JohnDoe",
        level: 75,
        email: "johndoe@example.com",
        notifications: false,
        homestate: "NJ",
    },
    {
        id: 3,
        pfp: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        username: "JaneSmith",
        level: 50,
        email: "janesmith@example.com",
        notifications: true,
        homestate: "NJ",
    },
];

