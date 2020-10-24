import React, { createContext } from "react"

export const createContextAndProvider = useCallback => {
  const Context = createContext(null)
  const Provider = ({ children }) => {
    const contextStore = useCallback()
    return <Context.Provider value={contextStore}>{children}</Context.Provider>
  }
  return [Context, Provider]
}
