import React, {useActionState} from 'react'
import {updateNameInDb} from "./api.js";

const App = () => {
    const [name, actionFunction, isPending] = useActionState(formAction, JSON.parse(localStorage.getItem("name")) || "Anonymous user");

    async function formAction(prevState, formAction) {
        try {
            return await updateNameInDb(formAction.get("name"))
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <p>
                Current user:<span>{name}</span>
            </p>
            {isPending && <p>Loading..</p>}
            <form action={actionFunction}>
                <input
                    type='text'
                    name={'name'}
                    required/>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}
export default App
