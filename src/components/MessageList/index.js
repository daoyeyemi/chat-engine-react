import { useChat } from '../../context';
import { ChatAvatar } from 'components/ChatAvatar';
import { groupMessages } from '../../helpers';
import { useScrollToBottom } from '../../hooks';

export const MessageList = () => {
  const { chosenChat } = useChat();
  useScrollToBottom(chosenChat, 'chat-messages');

  return (
    <div className="chat-messages">
      {!!chosenChat.messages.length ? (
        groupMessages(chosenChat.messages).map((m, index) => (
          <div key={index} className="chat-message">
            <div className="chat-message-header">
              <ChatAvatar className="message-avatar" username={m[0].sender.username} chat={chosenChat} />
              <div className="message-author">{m[0].sender.username}</div>
            </div>

            <div className="message-content">
              {m.map((individualMessage, index) => (
                <div key={index}>
                  <div className="message-text">{individualMessage.text}</div>

                  {!!individualMessage.attachments.length && (
                    <img alt={individualMessage.id + '-attachment'} src={individualMessage.attachments[0].file} className="message-image" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="no-messages-yet">No messages yet</div>
      )}
    </div>
  );
};
