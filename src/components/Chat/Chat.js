import { useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { getChats, ChatEngine } from "react-chat-engine";

export const Chat = () => {
    
    const {
       myChats, setMyChats, chatConfig, selectedChat,  
    } = useChat();
    
    // const myChat = useChat();

    useEffect(() => {
        console.log("My Chats: ", myChats);
    }, [myChats])

    return (
        <>
        {!!chatConfig && 
            (<ChatEngine 
                // hideUI={true}
                userName={chatConfig.userName}
                projectID={chatConfig.projectID}
                userSecret={chatConfig.userSecret}
                onConnect={() => {
                    getChats(chatConfig, setMyChats);
                }}
            />)
        }
        </>
    )
}

export default Chat;
