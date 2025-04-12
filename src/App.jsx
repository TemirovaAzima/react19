// import React, {useActionState} from 'react'
// import {updateNameInDb} from "./api.js";
//
// const App = () => {
//     const [state, actionFunction, isPending] = useActionState(updateName, {name:JSON.parse(localStorage.getItem("name")) || "Anonymous user"});
//
//     async function updateName(prevState, formAction) {
//         try {
//             const newName =formAction.get("name");
//             const newState = {name: newName};
//             await updateNameInDb(newState)
//             return newState
//         } catch (error) {
//             console.error(error.message)
//         }
//     }
//
//     return (
//         <>
//             <p className={'userName'}>
//                 Current user:<span>{state.name}</span>
//             </p>
//             {isPending && <p>Loading..</p>}
//             <form action={actionFunction}>
//                 <input
//                     type='text'
//                     name={'name'}
//                     required/>
//                 <button type='submit'>Submit</button>
//             </form>
//         </>
//     )
// }
// export default App
import React, {useActionState} from 'react'
import {updateNameInDb} from "./api.js";

const App = () => {
    const [state, actionFunction, isPending] = useActionState(updateName, {
        error: null,
        name: JSON.parse(localStorage.getItem("name")) || "Anonymous user"
    });

    async function updateName(prevState, formAction) {
        try {
            const newName = await updateNameInDb(formAction.get("name"));
            return {name: newName, error: null}
        } catch (error) {
            return {...prevState, error: error}
        }
    }

    return (
        <>
            <p className={'userName'}>
                Current user:<span>{state.name}</span>
            </p>
            {isPending && <p>Loading..</p>}
            <form action={actionFunction}>
                <input
                    type='text'
                    name={'name'}
                    required/>
                <button type='submit'>Submit</button>
                {state.error && <p style={{color: "red"}}>{state.error.message}</p>}
            </form>
        </>
    )
}
export default App
