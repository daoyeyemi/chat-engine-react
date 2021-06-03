import { fb } from '../../service';
import { useChat } from '../../context';
import { Image } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';

export const Avatar = ({ chat, username, className }) => {
  const { chatInfo } = useChat();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    fb.firestore.collection('chatUsers').where('userName', '==', username).get().then(snap => {
        const data = snap.docs[0]?.data();
        if (data?.avatar) {
          setAvatar(data.avatar);
        }
      });
  }, [chat, chatInfo, username]);

  return avatar ? (
    <Image className={className || 'chat-list-avatar'} src={avatar} />
  ) : (
    <div className={className || 'empty-avatar'}>
      {chat.people.find(p => p.person.username !== chatInfo.userName).person.username[0].toUpperCase()}
    </div>
  );
};
