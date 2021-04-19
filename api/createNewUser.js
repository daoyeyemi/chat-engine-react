import axios from "axios";

const createNewUser = async (req, res) => {
    const userId = req.body.userId;
    const userName = req.body.userName;

    axios.post("https://api.chatengine.io/projects/people/",
            { username: userName, secret: userId },
            { headers: { "Private-Key": process.env.newerprivatekey }}
        ).then(apiRes => {
            res.json({
                body: apiRes.data,
                error: null
            });
        }).catch(() => {
            res.json({
               body: null,
                error: "There was an error while user was being created." 
            });
        });
};

export default createNewUser;