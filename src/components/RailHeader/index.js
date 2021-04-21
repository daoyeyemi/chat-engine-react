import { fb } from "../../service/firebase";
import{ useRef, useState } from "react";
import {Icon, IconGroup, Image } from "semantic-ui-react";
import { Loading } from "@ant-design/icons";

export const RailHeader = () => {
    const chatConfig = useChat().chatConfig;
    const resolvedConfig = useResolved(chatConfig);
    const inputRef = useRef(null);
    const [picture, setPicture] = useState();

    const onFileAttach = file => {
        setPicture(file)
    };

    return (
        <>
        <input 
            className="file-input"
            type="file"
            ref={inputRef}
            onChange={event => {
                const doc = event.target?.files?.[0]
                if (doc) {
                    onFileAttach(doc);
                }
            }}
        />
        <div className="left-rail-header">
            <Icon 
                onClick={() => fb.auth.signOut()}
                className="current-user-info"
                name="sign-out"
            />
            <div className="current-user-info">
                <IconGroup 
                    className="user-avatar"
                    size="large"
                    onClick={() => {
                        const input = inputRef.current;
                        if (input) {
                            input.value = "";
                            input.click();
                        }
                    }}
                />
            </div>
        </div>
        </>
         

         
    )
}