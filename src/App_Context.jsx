import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const stateProvider = createContext()

const App_Context = ({children}) => {
    const [app_state , setAppState] = useState({
        isLogged:false,
        isLoading:false,
        user:{}
    })
  return (
    <stateProvider.Provider value={{
        app_state , setAppState
    }}>
        {children}
    </stateProvider.Provider>
  )
}

export default App_Context