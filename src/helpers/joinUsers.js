export const joinUsers = (people, currentUsername) => {
    return (
        "@" + people.map(person => person.person.username).filter(username => username !== currentUsername)
        .join(", @")
    )
}