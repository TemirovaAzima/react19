import React, {useState} from 'react'
import {updateNameInDb} from "./api.js";

const App = () => {
    const [name, setName] = useState(
        () => JSON.parse(localStorage.getItem("name")) || "Anonymous user");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(formAction) {
        setLoading(true);
        setError(null);
        try {
           const newName = await updateNameInDb(formAction.get("name"));
           setName(newName);
        } catch (error) {
            console.error(error.message);
            setError(error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            <p className={'username'}>
                Current user: <span>{name}</span>
            </p>
            <form action={handleSubmit}>
                <input
                    type="text"
                    name={"name"}
                    required
                />
                <button type={'submit'}>Update</button>
            </form>
        </>
    )
}
export default App
