 import { useState, useEffect } from 'react';
 import { fb } from '../service';

 export const useAuth = () => {
    const [authUser, setAuthUser] = useState();
  
    useEffect(() => {
      const unsubscribe = fb.auth.onAuthStateChanged(user => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });
      return unsubscribe;
    }, []);
  
    return {
      authUser,
    };
  };

export const useResolved = (...vals) => {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
      setResolved(vals.every(v => v !== undefined));
  }, [vals]);

  // if every value is not resolved return true
  return resolved;
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const useScrollToBottom = (trigger, className) => {
    // Scrolls to the bottom of a container with a 
    // given className when active is flipped to true
  
    // Because we are dealing with images as well, we need to wait
    // until the images have loaded fully before doing the scroll.
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
