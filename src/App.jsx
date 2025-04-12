import React, {useActionState} from 'react'
import {fakeAPICall} from "./api.js";

const App = () => {
    const [isLiked, toggleLike, isPending] = useActionState(likeAction, false);

    async function likeAction(prevState, formData) {
        const newState = !prevState
        await fakeAPICall(newState)
        return newState
    }

    return (
        <>
            <p>{isLiked ? "You liked this post!" : "You haven't liked the post"}</p>
            {isPending && <p>Updating...</p>}
            <form action={toggleLike}>
                <button type="submit"> {isLiked ? "Unlike" : "Like"}</button>
            </form>
        </>
    )
}
export default App
