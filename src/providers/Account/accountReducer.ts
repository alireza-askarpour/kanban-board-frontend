import { ActionProps, types } from "../../types/utils/providers"

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
}

const accountReducer = (state = initialState, action: ActionProps) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_USER:
      return { ...state, user: payload }
    default:
      return state
  }
}

export default accountReducer
