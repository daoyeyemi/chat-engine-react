import axios from axios;

import React from 'react'

const createNewUser = async (req, res) => {
    const userId = req.body.userId;
    const userName = req.body.userName;

    axios.post("https://chatengine.io/users/",
            { username: userName, secret: userId },
            { headers: { "Private-Key": process.env.private_key }}
        ).then(apiRes => {
            res.json({
                body: apiRes.body,
                error: null
            })
        }).catch(() => {
            res.json({
               body: null,
                error: "There was an error while user was being created." 
            })
        })
}

export default createNewUser;
