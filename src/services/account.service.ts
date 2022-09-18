import http from "config/http"

export const loginUser = async (user: { email: string; password: string }) => {
  try {
    const { data } = await http.post("/auth/login", user)
    return { success: true, token: data.token }
  } catch (err) {
    return { success: false, error: err }
  }
}

export const signUpUser = async (user: { password: string; username: string; email: string }) => {
  try {
    const { data } = await http.post("/auth/signup", user)
    return { success: true, token: data.token }
  } catch (err) {
    return { success: false, error: err }
  }
}

export const verifyToken = async () => {
  try {
    const { data } = await http.post("/auth/verify-token")
    return { success: true, user: data.user }
  } catch (err) {
    return { success: false, error: err }
  }
}
