import React from 'react';
import { useChat } from '../../context';
import { Avatar } from 'components/Avatar';
import { Icon } from 'semantic-ui-react';
import { joinUsernames, notMe } from '../../helpers';

export const ChatList = () => {
  const {
    personalChats,
    chatInfo,
    chosenChat,
    selectChatFunc,
    deleteChatFunc,
  } = useChat();

  return (
    <div className="chat-list">
      {personalChats.map((c, index) => (
        <div className={`chat-list-item ${chosenChat?.id === c.id ? 'selected-chat-item' : ''}`} key={index}>
          <div onClick={() => selectChatFunc(c)} className="chat-list-item-content">
            {c.people.length === 1 ? (
              <>
                <Icon circular inverted color="violet" name="user cancel" />
                <div className="chat-list-preview">
                  <div className="preview-username">No One Added Yet</div>
                </div>
              </>
            ) : c.people.length === 2 ? (
              <>
                <Avatar username={notMe(chatInfo, c)} chat={c} />

                <div className="chat-list-preview">
                  <div className="preview-username">{notMe(chatInfo, c)}</div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users" />
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {joinUsernames(c.people, chatInfo.userName).slice(0, 50)}
                    ...
                  </div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            )}
          </div>

          <div onClick={() => deleteChatFunc(c)} className="chat-item-delete">
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};
