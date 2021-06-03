import { fb } from 'service';
import { createContext, useContext, useEffect, useState } from 'react';
import { newChat, leaveChat, deleteChat, getMessages } from 'react-chat-engine';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [chosenChat, setChosenChat] = useState();

  const createChatFunc = () => {
    newChat(chatConfig, { title: '' });
  };
  const deleteChatFunc = chat => {
    const isAdmin = chat.admin === chatConfig.userName;

    if (isAdmin && window.confirm('Do you want to remove this chat?')
    ) {
      deleteChat(chatConfig, chat.id);
    } else if (window.confirm('Do you want to exit this chat?')) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };
  const selectChatFunc = chat => {
    getMessages(chatConfig, chat.id, messages => {
      setChosenChat({
        ...chat,
        messages,
      });
    });
  };

  // Set the chat config once the
  // authUser has initialized.
  useEffect(() => {
    if (authUser) {
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          setChatConfig({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: '3cd31823-07eb-40ae-a37c-808ff891088d',
          });
        });
    }
  }, [authUser, setChatConfig]);

  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfig,
        chosenChat,
        setChatConfig,
        setChosenChat,
        selectChatFunc,
        deleteChatFunc,
        createChatFunc,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    chosenChat,
    setChatConfig,
    setChosenChat,
    selectChatFunc,
    deleteChatFunc,
    createChatFunc,
  } = useContext(ChatContext);

  return {
    myChats,
    setMyChats,
    chatConfig,
    chosenChat,
    setChatConfig,
    setChosenChat,
    selectChatFunc,
    deleteChatFunc,
    createChatFunc,
  };
};
