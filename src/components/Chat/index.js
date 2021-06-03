import { useEffect } from 'react';
import { useChat } from '../../context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail } from 'components/LeftRail';
import { ChatToolbar } from 'components/ChatToolbar';
import { ChatInput } from 'components/ChatInput';
import { MessageList } from 'components/MessageList';
import { Icon } from 'semantic-ui-react';

export const Chat = () => {
  const { personalChats, setPersonalChats, chatInfo, chosenChat, selectChatFunc, setChosenChat } = useChat();

  useEffect(() => {
    console.log('My Chats: ', personalChats);
  }, [personalChats]);

  useEffect(() => {
    console.log('Chosen Chat: ', chosenChat);
  }, [chosenChat]);

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
            setPersonalChats(
              personalChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
            );
          }}
          onNewMessage={(chatId, message) => {
            if (chosenChat && chatId === chosenChat.id) {
              setChosenChat({
                ...chosenChat,
                messages: [...chosenChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = personalChats.find(c => c.id === chatId);
            const filteredChats = personalChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setPersonalChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
            );
          }}
        />
      )}

      <div className="chat-container">
        <LeftRail />
        <div className="current-chat">
          {chosenChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
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
