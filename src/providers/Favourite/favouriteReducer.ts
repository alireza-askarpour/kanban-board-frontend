import { ActionProps, types } from "../../types/utils/providers"

const initialState = {
  favourites: [],
}

const favouriteReducer = (state = initialState, action: ActionProps) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_FAVOURITES:
      return { ...state, favourites: payload }
    default:
      return state
  }
}

export default favouriteReducer
