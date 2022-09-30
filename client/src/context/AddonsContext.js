import {createContext, useReducer} from "react";

export const AddonsContext = createContext(undefined);

export const addonsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ADDONS':
            return {
                addons: action.payload
            };
        case 'CREATE_ADDON':
            return {
                addons: [action.payload, ...state.addons]
            };
        case 'DELETE_ADDON':
            return {
                addons: state.addons.filter((addon) => addon._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export const AddonsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(addonsReducer, {
        addons: null
    });

    return (
        <AddonsContext.Provider value={{...state, dispatch}}>
            {children}
        </AddonsContext.Provider>
    );
};
