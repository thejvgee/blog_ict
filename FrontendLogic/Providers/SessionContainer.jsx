"use client"
import React from 'react'
import {SessionProvider} from 'next-auth/react'

const SessionContainer = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionContainer