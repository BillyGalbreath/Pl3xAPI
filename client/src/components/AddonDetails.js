import {useAddonsContext} from "../hooks/useAddonsContext";
import {formatDistanceToNow} from "date-fns";
import {useAuthContext} from "../hooks/useAuthContext";

export const AddonDetails = ({addon}) => {
    const {dispatch} = useAddonsContext();
    const {user} = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }
        const response = await fetch(`/api/addons/${addon._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({type: 'DELETE_ADDON', payload: json});
        }
    };

    return (
        <div className="addon-details">
            <h4>{addon.title}</h4>
            <p><strong>Load (kg): </strong>{addon.load}</p>
            <p><strong>Reps: </strong>{addon.reps}</p>
            <p>{formatDistanceToNow(new Date(addon.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
};
