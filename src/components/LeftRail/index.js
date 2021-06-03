import { useChat } from '../../context';
import { useResolved } from '../../hooks';
import { ChatList } from 'components/ChatList';
import { RailHeader } from 'components/RailHeader';
import { Loader } from 'semantic-ui-react';

export const LeftRail = () => {
  const { personalChats, createChatFunc } = useChat();
  const chatsResolved = useResolved(personalChats);

  return (
    <div className="left-rail">
      <RailHeader />
      {chatsResolved ? (
        <>
          {!!personalChats.length ? (
            <div className="chat-list-container">
              <ChatList />
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>No Chats Yet</h3>
            </div>
          )}
          <button className="create-chat-button" onClick={createChatFunc}>
            Create Chat
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};
