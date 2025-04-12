import React, {useState} from 'react'
import {updateNameInDb} from "./api.js";

const App = () => {
    const [input, setInput] = useState("");
    const [name, setName] = useState(
        () => JSON.parse(localStorage.getItem("name")) || "Anonymous user"
    );

    function handleChange(event) {
        setInput(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const newName = await updateNameInDb(input);
            setName(newName);
            setInput("")
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <p className={'username'}>
                Current user: <span>{name}</span>
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    required
                />
                <button type={'submit'}>Update</button>
            </form>
        </>
    )
}
export default App
