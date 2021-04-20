import { useChat } from "../../context/ChatContext";
import { Search } from "semantic-ui-react";
import { useEffect, useRef, useState } from "react";
import { addPerson, getOtherPeople } from "react-chat-engine";

export const SearchUsers = ({visible, closeFn}) => {
    let searchRef = useRef();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [searchResults, setSearchResults] = useState(null);
    // when search bar becomes visible, ideally we want 
    // cursor to be inside search bar so it's more convenient 
    // for user 
    useEffect(() => {
        if (visible && searchRef) {
            searchRef.focus();
        }
    }, [visible])

    const {
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setSelectedChat
    } = useChat();

    const selectUser = (username) => {
        addPerson(chatConfig, selectedChat.id, username, () => {
            console.log(selectUser)
            const filteredChats = myChats.filter(chat => chat.id !== selectedChat.id);
            const mappedChats = myChats.map(chat => chat.id !== selectedChat.id);
            const updatedChat = {
                ...selectedChat,
                people: [...selectedChat.people, { person: {username}}]
            }
            console.log(mappedChats);
            console.log(filteredChats);
            setSelectedChat(updatedChat);
            setMyChats([...filteredChats, updatedChat]);
            closeFn();
        })
    }

    useEffect(() => {
        if (searchTerm) {
            setLoading(true)
            getOtherPeople(chatConfig, selectedChat.id, (chatId, data) => {
                console.log(data)
                console.log(chatId)
                const userNames = Object.keys(data).map(key => data[key].username)
                    .filter(u => u.toLowerCase().includes(searchTerm.toLowerCase()))
                
                setSearchResults(userNames.map(u => ({ title: u })));
                setLoading(false)
            })
        } else {
            setSearchResults(null);
        }
        
    }, [chatConfig, selectedChat, searchTerm]);

    return (
        <div className="user-search"
                style={{ display: visible ? "block" : "none" }}>
            <Search 
                fluid
                onBlur={closeFn}
                loading={loading}
                value={searchTerm}
                results={searchResults}
                placeholder="Search users"
                open={searchResults && !loading}
                input={{ ref: r => (searchRef = r) }}
                onSearchChange={event => setSearchTerm(event.target.value)}
                onResultSelect={(e, data) => {
                    if (data.result?.title) {
                        selectUser(data.result.title);
                    }
                }}
            />
        </div>
    )
}