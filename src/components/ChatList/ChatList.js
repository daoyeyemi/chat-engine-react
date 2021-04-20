import { useChat } from "../../context/ChatContext"
import { Icon } from "semantic-ui-react";
import { notUser } from "../../helpers/notUser";
import { joinUsers } from "../../helpers/joinUsers";
import { ChatAvatar } from "../ChatAvatar/ChatAvatar";

export const ChatList = () => {
 
    const {
        myChats,
        chatConfig,
        selectedChat,
        selectChatFunc,
        deleteChatFunc
    } = useChat();

    return (
        <div className="chat-list">
            {myChats.map((c, index) => (
                <div className={`chat-list-item ${selectedChat?.id === c.id 
                    ? "selected-chat-item" : ""}`} key={index}
                    >
                    <div className="chat-list-item-content" onClick={() => selectChatFunc(c)}>
                    {c.people.length === 1 ? (
                        <> 
                            <Icon circular inverted color="violet" name="user cancel" />
                            <div className="chat-list-preview">
                                <div className="preview-username">No one yet added</div>
                            </div>
                        </>
                    ) : c.people.length === 2 ? (
                        <>
                            <ChatAvatar username={notUser(chatConfig, c)} chat={c} />
                            <div className="chat-list-preview">
                                <div className="preview-username">
                                    {notUser(chatConfig, c)}
                                </div>
                                <div className="preview-message">
                                    {c.last_message.attachments.length ? 
                                    `${c.last_message.sender.username} sent an attachment`
                                    : (c.last_message.text.slice(0, 50) + "...")}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Icon circular inverted color="brown" name="users" />
                            <div className="preview-username">
                                {joinUsers(c.people, chatConfig.userName).slice(0, 50) + "..."}
                            </div>
                            <div className="preview-message">
                            {c.last_message.attachments.length ? 
                                    `${c.last_message.sender.username} sent an attachment`
                                    : (c.last_message.text.slice(0, 50) + "...")}
                            </div>
                        </>
                    )}
                    </div>
                    <div onClick={() => deleteChatFunc(c)} className="chat-item-delete">
                        <Icon name="delete" />
                    </div>
                </div>
            ) )}
        </div>
    )
}