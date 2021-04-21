import { useChat } from "../../context/ChatContext";
import { ChatAvatar } from "../../components/ChatAvatar/ChatAvatar";
import { GroupMessages } from "../../helpers/groupMessages";
import { scroll } from "../../hooks/scroll";

export const MessageList = () => {

    const { selectedChat } = useChat();
    scroll(selectedChat, "chat-messages")

    return (
        <div className="chat-messages">
            {selectedChat.messages.length ? (
                groupMessages(selectedChat.messages).map((m, index) => (
                <div key={index} className="chat-message">
                <div className="chat-message-header">
                    <ChatAvatar />

                    <div classname="message-author">{m[0].sender.username}</div>
                </div>

                <div className="message-content">
                    {m.map((individualMessage, index) =>(
                        <div key={index}>
                            <div className="message-text">{individualMessage.text}</div>
                            {individualMessage.attachments.length && (
                                <img
                            )}
                        </div>
                    ))}
                    
                    
                </div>
            </div>
                ))
            ) : (
                <div className="no-messages-yet">No messages yet</div>
            )}
        </div>
    );
};