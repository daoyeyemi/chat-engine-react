import React, { useEffect } from "react";
import { fb } from "./service/firebase";

function App() {
  useEffect(() => {
      fb.firestore.collection("chatUsers")
      .where("userName", "==", "daoyeyemi")
      .get()
      .then(res => {
        const user = res.docs[0]?.data();
        console.log(user);
      })
    }, []);
    
  return (
    <>Yuhhhh</>
  );
}


export default App;
