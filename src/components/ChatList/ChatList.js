import { useChat } from "../../context/ChatContext"
import { Icon } from "semantic-ui-react";

export const ChatList = () => {
    // return (
    //    <></> 
    // )
    const {
        myChats,
        chatConfig,
        selectedChat,
        selectChatFunc,
        deleteChatFunc
    } = useChat();

    return (
        <div className="chat-list">
            {myChats.map((chat, index) => (
                <div className={`chat-list-item ${selectedChat?.id === chat.id 
                    ? "selected-chat-item" : ""}`} key={index}
                    >
                    <div className="chat-list-item-content" onClick={() => selectChatFunc(chat)}>
                    {chat.people.length === 1 ? (
                        <> 
                            <Icon circular inverted color="violet" name="user cancel" />
                            <div className="chat-list-preview">
                                <div className="preview-username">No one yet added</div>
                            </div>
                        </>
                    ) : chat.people.length === 2 ? (
                        <>
                            <>Avatar</>
                            <div className="chat-list-preview">
                                <div className="preview-username">
                                    Input username here
                                <div className="preview-message">
                                    {chat.last_message.attachments.length ? 
                                    `${chat.last_message.sender.username} sent an attachment`
                                    : (chat.last_message.text.slice(0, 50) + "...")}
                                </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Icon circular inverted color="brown" name="users" />
                            <div className="preview-username">
                                Group of usernames
                            </div>
                            <div className="preview-message">
                            {chat.last_message.attachments.length ? 
                                    `${chat.last_message.sender.username} sent an attachment`
                                    : (chat.last_message.text.slice(0, 50) + "...")}
                            </div>
                        </>
                    )}
                    </div>
                </div>
            ) )}
        </div>
    )
}