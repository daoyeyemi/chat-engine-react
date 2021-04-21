import { sendMessage } from "react-chat-engine";
import { ImageUpload } from "../ImageUpload";
import { useState, useRef } from "react";
import { Icon } from "semantic-ui-react";
import { useChat } from "../../context/ChatContext";

export const ChatInput = () => {
    const chatConfig = useChat().chatConfig;
    const selectedChat = useChat().selectedChat;
    const [chatInputText, setChatInputText] = useState("");
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const inputRef = useRef(null);
    const [image, setImage] = useState();

    const sendChatMess = () => {
        if (selectedChat && chatInputText) {
            setChatInputText("");
            sendMessage(chatConfig, selectedChat.id, {
                text: chatInputText,
                files: []
            })
        }
    }

    const onFileAttach = (doc) => {
        setImage(doc);
        setImageModalOpen(true);
    }

    return (
        <>
        <div className= "chat-controls">
            <div className="attachment-icon" onClick={() => {
                const input = inputRef.current;
                if (input) {
                    input.value = "";
                    input.click()
                }
            }}>
                <Icon name="attach" color="red" />
            </div>
            <input 
                className="chat-input"
                placeholder="Send message"
                onKeyPress={event => {
                   if (event.key === "Enter") {
                       sendChatMess();
                   }
                }}
                onChange={event => setChatInputText(event.target.value)}
            />
            <div onClick={sendChatMessage} className="send-message-icon">
                <Icon name="send" color="grey" />
            </div>
                
            <input 
                type="file"
                ref={inputRef}
                className="file-input"
                accept="image/jpeg, image/png"
                onChange={event => {
                    const doc = event.target?.files?.[0];
                    if (doc) {
                        onFileAttach(file);
                    }
                }}
            />

            {imageModalOpen && !!image && (
                <ImageUpload 
                    file={image}
                    mode="message"
                    onSubmit={() => {
                        sendMessage(chatConfig, selectedChat.id,
                            {
                                text: chatInputText,
                                files: [image]
                            },
                            () => {
                                setImage(null);
                                setChatInputText("");
                            })
                    }}
                    close={() => setImageModalOpen(false)}
                />
            )}
        </div>
        </>
        
    )
}