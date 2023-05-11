import { createContext, useContext, useReducer } from "react"

import { IUser } from "../../types/schemas/User"
import { types } from "../../types/utils/providers"
import accountReducer from "./accountReducer"

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
}

const initialValues = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
  handleSetUser: (user: any) => {},
}

const AccountContext = createContext(initialValues)

export const AccountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState)

  const { isLoading, isLoggedIn, user } = state

  const handleSetUser = (user: IUser) => {
    dispatch({ type: types.SET_USER, payload: user })
  }

  const value = {
    isLoading,
    isLoggedIn,
    user,
    handleSetUser,
  }

  return <AccountContext.Provider value={value} children={children} />
}

export const useAccount = () => useContext(AccountContext)
