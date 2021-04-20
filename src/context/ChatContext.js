import { fb } from "../service/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { newChat, leaveChat, deleteChat, getMessages } from "react-chat-engine";

const ChatContext = createContext();


// callback function that goes through array in brackets that will activate useEffect
// function if authUser changes

export const ChatProvider = ( { children, authUser } ) => {
    const [myChats, setMyChats] = useState();
    const [chatConfig, setChatConfig] = useState();
    const [selectedChat, setSelectedChat] = useState();

    const createChatFunc = () => {
        newChat(chatConfig, { title: "" })
    };

    const deleteChatFunc = (chat) => {
        const isAdmin = chat.admin.username === chatConfig.userName;

        if (isAdmin && window.confirm("Are you sure you want to delete this chat?")) {
            deleteChat(chatConfig, chat.id, console.log(myChats));
        } else if (window.confirm("Are you sure you want to leave this chat?")) {
            leaveChat(chatConfig, chat.id, chatConfig.userName);
        }
    }

    const selectChatFunc = (chat) => {
        getMessages(chatConfig, chat.id, messages => {
            setSelectedChat({
                ...chat,
                messages
            });
            console.log(chat);
        });
    };

    useEffect(() => {
        if (authUser) {
            fb.firestore
                .collection("chatUsers")
                .doc(authUser.uid)
                .onSnapshot(shot => {
                    setChatConfig({
                        userSecret: authUser.uid,
                        avatar: shot.data().avatar,
                        userName: shot.data().userName,
                        projectID: "7c426087-b6c7-4934-a67c-80cdf624709e"
                    })
                })
        }
    }, [authUser]);

    return (
       <ChatContext.Provider 
        value={{
            myChats,
            setMyChats,
            chatConfig,
            setChatConfig,
            selectedChat,
            setSelectedChat,
            selectChatFunc,
            deleteChatFunc,
            createChatFunc
        }}>
           {children}
       </ChatContext.Provider>
    );
};

// can only use this function and its contents with the children of 
// the chat context provider 
export const useChat = () => {
    const myChats = useContext(ChatContext).myChats;
    const setMyChats = useContext(ChatContext).setMyChats;
    const chatConfig = useContext(ChatContext).chatConfig;
    const selectedChat = useContext(ChatContext).selectedChat;
    const setChatConfig = useContext(ChatContext).setChatConfig;
    const setSelectedChat = useContext(ChatContext).setSelectedChat;
    const selectChatFunc = useContext(ChatContext).selectChatFunc;
    const deleteChatFunc = useContext(ChatContext).deleteChatFunc;
    const createChatFunc = useContext(ChatContext).createChatFunc;

    return {
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setChatConfig,
        setSelectedChat,
        selectChatFunc,
        deleteChatFunc,
        createChatFunc 
    }
}