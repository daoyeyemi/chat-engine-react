import { fb } from "service";
import { createContext } from "react";
import { newChat } from "chat-engine-io";

const ChatContext = createContext();

const ChatProvider = ({ children, authUser }) => {
    const [myChats, setMyChats] = useState();
    const [chatConfig, setChatConfig] = useState();
    const [selectedChat, setSelectedChat] = useState();

    const createChat = () => {
        newChat(chatConfig, { title: "" })
    };

    const deleteChat = (chat) => {
        const userAdmin = chat.admin === chatConfig.userName;

        if (isAdmin && window.confirm("Are you sure you want to delete this chat?")) {
            deleteChat(chatConfig, chat.id)
        }
    }

    return (
       <ChatContext.Provider 
        value={{

        }}
       >
           {children}
       </ChatContext.Provider>
    )
}