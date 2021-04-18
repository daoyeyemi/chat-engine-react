import { useChat } from "../../context/ChatContext";
import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { fb } from "../../service/firebase";
// must remember, when passing in objects into function, must be enclosed with braces
export const ChatAvatar = ({chat, username, className}) => {
    const chatConfig = useChat().chatConfig;
    const [avatar, setAvatar] = useState("");
  
    useEffect(() => {
        fb.firestore.collection("chatUsers")
                    .where("userName", "==", username)
                    .get()
                    .then(snap => {
                        const data = snap.docs[0]?.data();
                        if (data?.avatar) {
                            setAvatar(data.avatar)
                        }
                    })
    }, [chat, chatConfig, username]);

    return (
        avatar ? (
        <Image className={className || "chat-list-avatar"} src={avatar} />
        ) : (
            <div className={className || "empty-avatar"}>
                {/* userName is different from username for a reason */}
                {chat.people.find(people => people.person.username !== chatConfig.userName)
                .person.username[0]}
            </div>
        )
    )
}