export const notUser = (chatConfig, selectedChat) => {
    return (
        // question marks are for optional chaining, relatively new react js feature
        selectedChat.people.find(p => p.person.username !== chatConfig.userName)?.person?.username
    )
}