import { useEffect } from 'react';
import { useChat } from '../../context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail } from 'components/LeftRail';
import { ChatToolbar } from 'components/ChatToolbar';
import { ChatInput } from 'components/ChatInput';
import { MessageList } from 'components/MessageList';
import { Icon } from 'semantic-ui-react';

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    chosenChat,
    selectChatFunc,
    setChosenChat,
  } = useChat();

  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

  useEffect(() => {
    console.log('chosen Chat: ', chosenChat);
  }, [chosenChat]);

  return (
    <>
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={chat => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatFunc(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={chat => {
            if (chosenChat?.id === chat.id) {
              setChosenChat(null);
            }
            setMyChats(
              myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
            );
          }}
          onNewMessage={(chatId, message) => {
            if (chosenChat && chatId === chosenChat.id) {
              setChosenChat({
                ...chosenChat,
                messages: [...chosenChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats(
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
