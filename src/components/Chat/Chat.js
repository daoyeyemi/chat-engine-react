import { useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { getChats, ChatEngine } from "react-chat-engine";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { LeftRail } from "../LeftRail/LeftRail";
import { ChatToolbar } from "../ChatToolbar/ChatToolbar";
import { MessageList } from "../MessageList/index";
import { ChatInput } from "../ChatInput/index";

export const Chat = () => {
    
    const {
       myChats, setMyChats, chatConfig, selectedChat,  
    } = useChat();
    
    useEffect(() => {
        console.log("My Chats: ", myChats);
    }, [myChats])

    return (
        <>
        
        {!!chatConfig && 
            (<ChatEngine 
                hideUI={true}
                userName={chatConfig.userName}
                projectID={chatConfig.projectID}
                userSecret={chatConfig.userSecret}
                onConnect={() => {
                    getChats(chatConfig, setMyChats);
                }}
            />)
        }
 
        <div className="chat-container">
            <LeftRail />
            <div className="current-chat">
                { selectedChat ? (
                <div className="chat">
                    <ChatToolbar />
                    <MessageList />
                    <ChatInput />
                </div>
                ) : (
                <div className="no-chat-selected">
                    <ArrowLeftOutlined style={{ paddingRight : "15px"}}/>
                    Choose a Chat
                </div>
                ) }
            </div>
        </div>
        </>

    )
}

export default Chat;
