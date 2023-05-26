import axios from "axios"
import { messages } from "../constants/messages"

export function errorHandling(error: any, defaultErrorMessage = "NETWORK_ERROR"): string {
  if (axios.isAxiosError(error)) {
    const serverErrorMessage = error.response?.data.message
    // @ts-ignore
    if (serverErrorMessage && messages[serverErrorMessage]) {
      // @ts-ignore
      return messages[serverErrorMessage]
    }
    return defaultErrorMessage
  }
  return defaultErrorMessage
}
