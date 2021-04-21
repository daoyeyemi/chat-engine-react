export const ChatInput = () => {
    const chatConfig = useChat().chatConfig;
    const selectedChat = useChat().selectedChat;
    const [chatInputText, setChatInputText] = useState("");
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const inputRef = useRef(null);
    const [image, setImage] = useState();

    return (
        <>
        <div className= "chat-controls">
            <div onClick={() => {
        
            }} className="attachment-icon">

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