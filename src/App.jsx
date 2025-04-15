import {useOptimistic, useState} from "react";
import {fakePostCommentToServer} from "./api.js";

export default function AppPage() {
    const [comments, setComments] = useState([]);
    const [optimisticComments, addOptimisticComments] = useOptimistic(
        comments,
        (currentComments, newComment) => [...currentComments, newComment]
    );

    async function handleAddComment(commentText) {
        const newComment = {id: Date.now(), text: commentText};

        // await fakePostCommentToServer(newComment);
        addOptimisticComments(newComment)

        await fakePostCommentToServer(newComment);
        setComments(prev => [...prev, newComment]);
    }

    return (
        <div>
            {optimisticComments.map((comments) => (
                <p key={Math.random()}>{comments.text}</p>
            ))}
            <button onClick={() => handleAddComment("Hello world?")}>
                Add Comment
            </button>
        </div>
    )
}