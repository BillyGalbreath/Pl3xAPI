import {useAuthContext} from "./useAuthContext";
import {useAddonsContext} from "./useAddonsContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: addonsDispatch} = useAddonsContext();

    const logout = async () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        addonsDispatch({type: 'SET_ADDONS', payload: null});
    };

    return {logout};
};
