export const groupMessages = (messages) => {
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
  
    finalArr.push([...currentArr]);
  
    return finalArr;
  };

export const joinUsernames = (people, currentUsername) => {
    return '@' + people.map(p => p.person.username).filter(un => un !== currentUsername).join(', @');
};

export const notMe = (chatInfo, chosenChat) => {
    return chosenChat.people.find(p => p.person.username !== chatInfo.userName)?.person?.username;
};