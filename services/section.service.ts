import http from "config/http"

export const createSection = async (boardId: string) => {
  try {
    const { data } = await http.post(`boards/${boardId}/sections/create`)
    return { success: true, section: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const updateSection = async (boardId: string, sectionId: string, section: any) => {
  try {
    const { data } = await http.put(`boards/${boardId}/sections/update/${sectionId}`, section)
    return { success: true, section: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const deleteSection = async (boardId: string, sectionId: string) => {
  try {
    await http.delete(`boards/${boardId}/sections/delete/${sectionId}`)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
