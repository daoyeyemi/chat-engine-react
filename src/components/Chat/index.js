import { useEffect } from 'react';
import { useChat } from '../../context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail } from 'components/LeftRail';
import { Toolbar } from 'components/Toolbar';
import { Input } from 'components/Input';
import { MessageList } from 'components/MessageList';
import { Icon } from 'semantic-ui-react';

export const Chat = () => {
  const { personalChats, setPersonalChats, chatInfo, chosenChat, selectChatFunc, setChosenChat } = useChat();

  return (
    <>
      {!!chatInfo && (
        <ChatEngine
          hideUI={true}
          userName={chatInfo.userName}
          projectID={chatInfo.projectID}
          userSecret={chatInfo.userSecret}
          onConnect={() => {
            getChats(chatInfo, setPersonalChats);
          }}
          onNewChat={chat => {
            if (chat.admin.username === chatInfo.userName) {
              selectChatFunc(chat);
            }
            setPersonalChats([...personalChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={chat => {
            if (chosenChat?.id === chat.id) {
              setChosenChat(null);
            }
            setPersonalChats(personalChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id));
          }}
          onNewMessage={(chatId, message) => {
            if (chosenChat && chatId === chosenChat.id) {
              setChosenChat({ ...chosenChat, messages: [...chosenChat.messages, message] });
            }
            const chatThatMessageIsIn = personalChats.find(c => c.id === chatId);
            const filteredChats = personalChats.filter(c => c.id !== chatId);
            const updatedChat = { ...chatThatMessageIsIn, last_message: message };
            setPersonalChats([updatedChat, ...filteredChats].sort((a, b) => a.id - b.id));
          }}
        />
      )}

      <div className="chat-container">
        <LeftRail />
        <div className="current-chat">
          {chosenChat ? (
            <div className="chat">
              <Toolbar />
              <MessageList />
              <Input />
            </div>
          ) : (
            <div className="no-chat-selected">
              <Icon size='big' name='angle double left' />
              Choose A Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};
