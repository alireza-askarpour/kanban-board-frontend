import { createContext, useReducer, useContext } from "react"
import { IBoard } from "types/schemas/Board"
import { types } from "types/utils/providers"
import boardReducer from "./boardReducer"

const initialState = {
  boards: [],
}

const initialValue = {
  boards: [],
  handleSetBoards: (boards) => {},
}

const BoardContext = createContext(initialValue)

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState)

  const handleSetBoards = (boards: IBoard) => {
    dispatch({ type: types.SET_BOARDS, payload: boards })
  }

  const value = {
    boards: state.boards,
    handleSetBoards,
  }

  return <BoardContext.Provider value={value} children={children} />
}

export const useBoard = () => useContext(BoardContext)
