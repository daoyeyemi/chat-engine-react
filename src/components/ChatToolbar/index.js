import { useState } from 'react';
import { useChat } from '../../context';
import { joinUsernames } from '../../helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components/SearchUsers';

export const ChatToolbar = () => {
  const { chosenChat, chatInfo } = useChat();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {joinUsernames(chosenChat.people, chatInfo.userName).slice(0, 100)}
        </div>

        <div className="add-user-icon">
          <Icon
            color="white"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};