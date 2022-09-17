import http from "config/http"

export const craeteTask = async (boardId: string, sectionId: { sectionId: string }) => {
  try {
    const { data } = await http.post(`boards/${boardId}/tasks/create`, sectionId)
    return { success: true, task: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const deleteTask = async (boardId: string, taskId: string) => {
  try {
    await http.delete(`boards/${boardId}/tasks/${taskId}`)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const updateTask = async (boardId: string, taskId: string, updatedTask: any) => {
  try {
    const { data } = await http.put(`boards/${boardId}/tasks/${taskId}`, updatedTask)
    return { success: true, task: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const updatePositionTask = async (boardId: string, params: any) => {
  try {
    await http.put(`boards/${boardId}/tasks/update-position`, params)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
