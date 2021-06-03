import axios from 'axios';

const createUser = async (req, res) => {
  const userId = req.body.userId;
  const userName = req.body.userName;

  axios.post('https://api.chatengine.io/projects/people/',
      { username: userName, secret: userId },
      { headers: { 'Private-Key': "f5024ff7-8b2c-402d-99d6-55754c53c193" } },
    ).then(apiRes => {
      res.json({
        body: apiRes.data,
        error: null,
      });
    }).catch(() => {
      res.json({
        body: null,
        error: 'There was an error creating the user',
      });
    });
};

export default createUser;
