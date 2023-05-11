import axios from "axios"

const getToken = () => localStorage.getItem("token")

const http: any = axios.create({
  baseURL: "http://localhost:8000",
})

http.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }
})

export default http
