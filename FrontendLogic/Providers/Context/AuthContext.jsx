import React, { createContext, useReducer } from 'react'

export const MyContext = createContext()

const Initialstate = {user : null}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {...state , user : action.payload}

    case "LOGOUT":
      return {...state , user : null}
  
    default:
      return state
  }
}

const AuthContext = ({children}) => {

  const [state, dispatch] = useReducer(reducer, Initialstate)
  return (
    <MyContext.Provider value={{state, dispatch}}>{children}</MyContext.Provider>
  )
}

export default AuthContext