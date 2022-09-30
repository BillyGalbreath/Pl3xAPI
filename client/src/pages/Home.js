import {useEffect} from "react";
import {AddonDetails} from "../components/AddonDetails";
import {AddonForm} from "../components/AddonForm";
import {useAddonsContext} from "../hooks/useAddonsContext";
import {useAuthContext} from "../hooks/useAuthContext";

export const Home = () => {
    const {addons, dispatch} = useAddonsContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchAddons = async () => {
            const response = await fetch('/api/addons', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({type: 'SET_ADDONS', payload: json});
            }
        };
        if (user) {
            fetchAddons()
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="addons">
                {addons && addons.map((addon) => (
                    <AddonDetails key={addon._id} addon={addon}/>
                ))}
            </div>
            <AddonForm/>
        </div>
    );
};
