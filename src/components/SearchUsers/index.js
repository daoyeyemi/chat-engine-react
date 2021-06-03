import { useChat } from '../../context';
import { useDebounce } from '../../hooks';
import { Search } from 'semantic-ui-react';
import { useEffect, useRef, useState } from 'react';
import { addPerson, getOtherPeople } from 'react-chat-engine';

export const SearchUsers = ({ visible, closeFn }) => {
  let searchRef = useRef();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // null -> not searching for results
  // [] -> No results
  // [...] -> Results
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (visible && searchRef) {
      searchRef.focus();
    }
  }, [visible]);

  const {
    personalChats,
    setPersonalChats,
    chatInfo,
    chosenChat,
    setChosenChat,
  } = useChat();

  const selectUser = username => {
    addPerson(chatInfo, chosenChat.id, username, () => {
      const filteredChats = personalChats.filter(c => c.id !== chosenChat.id);
      const updatedChat = {
        ...chosenChat,
        people: [...chosenChat.people, { person: { username } }],
      };

      setChosenChat(updatedChat);
      setPersonalChats([...filteredChats, updatedChat]);
      closeFn();
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      getOtherPeople(chatInfo, chosenChat.id, (chatId, data) => {
        const userNames = Object.keys(data)
          .map(key => data[key].username)
          .filter(u =>
            u.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
          );
        setSearchResults(userNames.map(u => ({ title: u })));
        setLoading(false);
      });
    } else {
      setSearchResults(null);
    }
  }, [debouncedSearchTerm, chatInfo, chosenChat]);

  return (
    <div
      className="user-search"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <Search
        fluid
        onBlur={closeFn}
        loading={loading}
        value={searchTerm}
        placeholder="Search For Users"
        open={!!searchResults && !loading}
        input={{ ref: r => (searchRef = r) }}
        onSearchChange={e => setSearchTerm(e.target.value)}
        results={searchResults}
        onResultSelect={(e, data) => {
          if (data.result?.title) {
            selectUser(data.result.title);
          }
        }}
      />
    </div>
  );
};
