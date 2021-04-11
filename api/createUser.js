import axios from axios;

import React from 'react'

const createNewUser = async (req, res) => {
    const userId = req.body.userId;
    const userName = req.body.userName;

    axios
        .post("https://chatengine.io/projects/people",
            { username: userName, secret: userId },
            { headers: { "Private-Key": "Not yet declared" }}
        )
}

export default createUser
