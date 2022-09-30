import {useState} from "react";
import {useAddonsContext} from "../hooks/useAddonsContext";
import {useAuthContext} from "../hooks/useAuthContext";

export const AddonForm = () => {
    const {dispatch} = useAddonsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const {user} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const addon = {title, load, reps};

        const response = await fetch('/api/addons', {
            method: 'POST',
            body: JSON.stringify(addon),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log("new addon added", json);
            dispatch({type: 'CREATE_ADDON', payload: json});
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Addon</h3>

            <label>Exercise Title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}
                   className={emptyFields.includes('title') ? 'error' : ''}/>

            <label>Load (in kg):</label>
            <input type="number" onChange={(e) => setLoad(e.target.value)} value={load}
                   className={emptyFields.includes('load') ? 'error' : ''}/>

            <label>Reps:</label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps}
                   className={emptyFields.includes('reps') ? 'error' : ''}/>

            <button>Add Addon</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};
