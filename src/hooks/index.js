import { fb } from 'service';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(); // undefined | firebase.User | null

  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticatedUser(user);
      } else {
        setAuthenticatedUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return {
    authenticatedUser,
  };
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const useResolved = (...vals) => {
    const [resolved, setResolved] = useState(false);

    useEffect(() => {
        setResolved(vals.every(v => v !== undefined));
    }, [vals]);

    // Returns true if resolved otherwise false
    return resolved;
};

export const useScrollToBottom = (trigger, className) => {
   
    useEffect(() => {
      if (!!trigger) {
        Promise.all(
          Array.from(document.images)
            .filter(img => !img.complete)
            .map(img => new Promise(resolve => {
              img.onload = img.onerror = resolve;
            }))
        )
          .then(() => {
            document.getElementsByClassName(className)[0].scrollTop = document.getElementsByClassName(className)[0].scrollHeight;
          });
      }
    }, [trigger, className]);
  };

  
  