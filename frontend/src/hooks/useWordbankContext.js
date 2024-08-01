import { WbContext } from "../context/WordbankContext"
import { useContext } from "react"

export const useWbContext = () => {
  const context = useContext(WbContext)

  if(!context) {
    throw Error('useWbContext must be used inside an WbContextProvider')
  }

  return context
}