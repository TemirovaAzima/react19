import React, {useActionState, useOptimistic} from 'react'
import {updateNameInDB} from "./api.js"

const App = () => {
    const [state, actionFunction] = useActionState(updateName, {
        error: null,
        name: JSON.parse(localStorage.getItem("name"))?.name || 'Anonymous user'
    });

    const [optimistic, setOptimistic] = useOptimistic(state.name);

    async function updateName(prevState, formAction) {

        try {
            setOptimistic(formAction.get(("name")))
            const newName = await updateNameInDB(formAction.get("name"));
            return {name: newName, error: null}
        } catch (error) {
            return {...prevState, error: error}
        }
    }

    return (
        <>
            <p className="username">
                Current user: <span>{optimistic}</span>
            </p>
            <form action={actionFunction}>
                <input
                    type={'text'}
                    name={"name"}
                    required
                />
                <button type='submit'>Update</button>
                {state.error && <p style={{color: "red"}}>{state.error.message}</p>}
            </form>
        </>
    )
}
export default App
