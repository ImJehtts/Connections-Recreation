import { createContext, useReducer } from "react"

export const WbContext = createContext()

export const WbReducer = (state, action) => {
    switch (action.type){
        case 'SET_WORDS':
            return {
                words: action.payload
            }
        default:
            return state
    }
}

export const WbContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(WbReducer, {
        words: null,
    })

    return(
        <WbContext.Provider value={{...state,dispatch}}>
            {children}
        </WbContext.Provider>
    )
}
    