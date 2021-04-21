import { sendMessage } from "react-chat-engine";

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
            }} >

            </div>
            <input 
                className="chat-input"
                placeholder="Send message"
            />
            <div className="send-message-icon"></div>

            <input />
        </div>
        </>
        
    )
}