import { useChat } from "../../context/ChatContext";
import useResolved from "../../hooks/useResolved";
import { LoadingOutlined } from "@ant-design/icons";

export const LeftRail = () => {
    const { myChats, createChatFunc } = useChat();
    const chatsResolved = useResolved(myChats);

    return (
        <div className="left-rail">
            {chatsResolved ? ( 
                <>
                    {myChats.length ? (
                        <div className="chat-list-container">

                        </div>
                    ) : (
                        <div className="chat-list-container no-chats-yet">
                            <h3>No Chats Yet</h3>
                        </div>
                    )}
                    <button className="create-chat-button" onClick={createChatFunc}>
                        Create chat
                    </button>  
                </> 
            ) : (
                <div className="chats-loading">
                    <LoadingOutlined />
                </div>
            )}
        </div>
    )
}