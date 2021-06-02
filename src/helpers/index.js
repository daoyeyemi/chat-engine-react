export const groupMessages = messages => {
    const finalArr = [];
  
    let currentArr = [];
    let currentAuthor = '';
    messages.forEach(m => {
        if (m.sender.username !== currentAuthor) {
          if (currentAuthor) {
            finalArr.push([...currentArr]);
          }
          currentArr.splice(0, currentArr.length); // empty the array
          currentArr.push(m);
          currentAuthor = m.sender.username;
        } else {
          currentArr.push(m);
        }
    });
  
    // We have to call this at the very end as well because
    // once the loop finishes, the first if(){} block will
    // not run and thus the finalArr.push line will not run
    finalArr.push([...currentArr]);
  
    return finalArr;
  };

export const joinUsernames = (people, currentUsername) => {
    return '@' + people
        .map(p => p.person.username)
        .filter(un => un !== currentUsername)
        .join(', @');
};

export const notMe = (chatConfig, selectedChat) => {
    return selectedChat.people.find(p => p.person.username !== chatConfig.userName)?.person?.username;
};
  

