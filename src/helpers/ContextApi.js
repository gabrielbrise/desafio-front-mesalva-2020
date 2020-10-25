import React, { createContext } from "react"

export const createContextAndProvider = (useCallback, defaultState = null) => {
  const Context = createContext(defaultState)
  const Provider = ({ children }) => {
    const contextStore = useCallback()
    return <Context.Provider value={contextStore}>{children}</Context.Provider>
  }
  return [Context, Provider]
}
