import http from "config/http"
import { IBoard } from "types/schemas/Board"

export const createBoard = async () => {
  try {
    const { data } = await http.post("board/create")
    return { success: true, board: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const getAllBoards = async () => {
  try {
    const { data } = await http.get("boards")
    return { success: true, boards: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const updatePositoinBoard = async (boards: IBoard[]) => {
  try {
    await http.put("board/update-position", boards)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const getOneBoard = async (id: string) => {
  try {
    const { data } = await http.get(`boards/${id}`)
    return { success: true, board: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const deleteBoard = async (id: string) => {
  try {
    await http.delete(`boards/${id}`)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export const updateBoard = async (id: string, board: IBoard) => {
  try {
    const { data } = await http.put(`boards/${id}`, board)
    return { success: true, board: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const getFavouritesBoards = async () => {
  try {
    const { data } = await http.get("boards/favourites")
    return { success: true, favourites: data }
  } catch (error) {
    return { success: false, error }
  }
}

export const updateFavouritePositionBoards = async (boards: IBoard[]) => {
  try {
    await http.put("boards/favourites", boards)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
