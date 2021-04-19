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
        const filteredChats = chats.map(chat => chat.id !== selectedChat.id);
        const updatedChat = {
            ...selectedChat,
            people: [...selectedChat.people, { person: {username}}]
        }
        setSelectedChat(updatedChat);
        setMyChats([...filteredChats, updatedChat]);
        closeFn();
    }
}