export async function fakePostCommentToServer(comment){
    return await new Promise(resolve => setTimeout(()=>resolve(comment),1000))
}