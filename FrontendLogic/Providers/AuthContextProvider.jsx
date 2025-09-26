"use client"
import React from 'react'
import AuthContext from './Context/AuthContext'

const AuthContextProvider = ({children}) => {
  return (
    <AuthContext>{children}</AuthContext>
  )
}

export default AuthContextProvider