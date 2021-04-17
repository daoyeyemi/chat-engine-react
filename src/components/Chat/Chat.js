import { useEffect } from "react";
import { useChat } from "../../context/ChatContext";

function Chat() {
    const ChatStuff = useChat();
    
    useEffect(() => {
        console.log(ChatStuff);
    }, [ChatStuff])
    
    return (
        <>
        Chat
        </>
    )
}

export default Chat
