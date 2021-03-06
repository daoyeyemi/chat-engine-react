import { fb } from 'service';
import { createContext, useContext, useEffect, useState } from 'react';
import { newChat, leaveChat, deleteChat, getMessages } from 'react-chat-engine';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authenticatedUser }) => {
  const [personalChats, setPersonalChats] = useState();
  const [chatInfo, setChatInfo] = useState();
  const [chosenChat, setChosenChat] = useState();

  const createChatFunc = () => {
    newChat(chatInfo, { title: '' });
  };
  const deleteChatFunc = chat => {
    const isAdmin = chat.admin === chatInfo.userName;

    if (isAdmin && window.confirm('Do you want to remove this chat?')) {
      deleteChat(chatInfo, chat.id);
    } else if (window.confirm('Do you want to exit this chat?')) {
      leaveChat(chatInfo, chat.id, chatInfo.userName);
    }
  };
  const selectChatFunc = chat => {
    getMessages(chatInfo, chat.id, messages => {
      setChosenChat({ ...chat, messages });
    });
  };

  useEffect(() => {
    if (authenticatedUser) {
      fb.firestore.collection('chatUsers').doc(authenticatedUser.uid).onSnapshot(snap => {
          setChatInfo({
            userSecret: authenticatedUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: '3cd31823-07eb-40ae-a37c-808ff891088d',
          });
      });
    }
  }, [authenticatedUser, setChatInfo]);

  return (
    <ChatContext.Provider value={{ personalChats, setPersonalChats, chatInfo, chosenChat, setChatInfo, setChosenChat, selectChatFunc, deleteChatFunc, createChatFunc }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const { personalChats, setPersonalChats, chatInfo, chosenChat, setChatInfo, setChosenChat, selectChatFunc, deleteChatFunc, createChatFunc } = useContext(ChatContext);

  return { personalChats, setPersonalChats, chatInfo, chosenChat, setChatInfo, setChosenChat, selectChatFunc, deleteChatFunc, createChatFunc };
};
