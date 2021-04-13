import { useState, useEffect } from "react";

function useResolved (
    ...values
) {
// initial state of resolved is false 
    const [resolved, setResolved] = useState(false);

// every a new set of values are brought in, we will check to see if values
// are undefined
// if any is undefined, set resolved to true  

    useEffect(() => {
        setResolved(values.every(v => v !== undefined));
    }, [values]);

    return resolved;
}

export default useResolved;