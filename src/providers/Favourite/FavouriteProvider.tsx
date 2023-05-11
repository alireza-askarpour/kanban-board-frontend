import { createContext, useReducer, useContext } from "react"
import { types } from "../../types/utils/providers"
import { IBoard } from "../../types/schemas/Board"
import favouriteReducer from "./favouriteReducer"

const initialState = {
  favourites: [],
}

const initialValue = {
  favourites: [],
  handleSetFavourites: (favourites) => {},
}

const FavouriteContext = createContext(initialValue)

export const FavouriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouriteReducer, initialState)

  const handleSetFavourites = (favourites: IBoard[]) => {
    dispatch({ type: types.SET_FAVOURITES, payload: favourites })
  }

  const value = {
    favourites: state.favourites,
    handleSetFavourites,
  }

  return <FavouriteContext.Provider value={value} children={children} />
}

export const useFavourite = () => useContext(FavouriteContext)
