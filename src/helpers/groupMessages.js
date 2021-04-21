export const groupMessages = (messages) => {
    const finalArray = [];

    let currentArray = [];
    let currentAuthor = "";

    messages.forEach(m => {
        if (m.sender.username !== currentAuthor) {
            if (currentAuthor) {
                finalArray.push([...currentArray])
            }
            currentArray.splice(0, currentArray.length);
            currentArray.push(m);
            currentAuthor = m.sender.username;
        } else {
            currentArray.push(m)
        }
    })
    finalArray.push([...currentArray])

    return finalArray
}