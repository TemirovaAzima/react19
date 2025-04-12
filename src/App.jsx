import React, {useState} from 'react'
import {updateNameInDb} from "./api.js";

const App = () => {
    const [name,setName] = useState(()=>JSON.parse(localStorage.getItem("name")) || "Anonymous name");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    async function handleSubmit(event){
        event.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const newName = await updateNameInDb(event.target.name.value);
            setName(newName);
        }catch(error){
            setError(error.message)
        }finally{
            setLoading(false);
        }
    }
    return (
        <>
            <p className='username'>
                Current user: <span>{name}</span>
            </p>
            <form onSubmit={handleSubmit}>
                <input type='text' name={'name'} required/>
                <button type='submit' disabled={loading}>Submit</button>
            </form>
            {error && <p>Error: {error}</p>}
            {loading && <p>Loading..</p>}
        </>
    )
}
export default App
