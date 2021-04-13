import { fb } from "../service/firebase";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [authUser, setAuthUser] = useState();

    useEffect(() => {
        const unsubscribe = fb.auth.onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return unsubscribe
    }, []);

    return {
        authUser
    }
};

export default useAuth;