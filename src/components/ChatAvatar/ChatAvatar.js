import { useChat } from "../../context/ChatContext";
import { useState } from "react";
import { Image } from "semantic-ui-react";

// must remember, when passing in objects into function, must be enclosed with braces
export const ChatAvatar = ({chat, username, className}) => {
    const chatConfig = useChat().chatConfig;
    const [avatar, setAvatar] = useState("");
    // return (

    // )
}