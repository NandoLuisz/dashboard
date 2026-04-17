import axios from "axios"

export const foodFetch = axios.create({
  baseURL: "https://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
})
