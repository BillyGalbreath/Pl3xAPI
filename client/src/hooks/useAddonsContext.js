import {useContext} from "react";
import {AddonsContext} from "../context/AddonsContext";

export const useAddonsContext = () => {
    const context = useContext(AddonsContext)
    if (!context) {
        throw Error('usedAddonsContext must be used inside a AddonsContextProvider');
    }
    return context;
};
