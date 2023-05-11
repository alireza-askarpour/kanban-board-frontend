import { ActionProps, types } from "../../types/utils/providers"

const initialState = {
  boards: [],
}

const boardReducer = (state = initialState, action: ActionProps) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_BOARDS:
      return { ...state, boards: payload }
    default:
      return state
  }
}

export default boardReducer
