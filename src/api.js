export async function fakeAPICall (newState){
    await new Promise(resolve => setTimeout(resolve, 100));
    return newState;
}