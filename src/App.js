import { useEffect } from 'react';
import { ChatProvider } from 'context';
import 'semantic-ui-css/semantic.min.css';
import { useAuth, useResolved } from 'hooks';
import { Login } from 'components/Login';
import { Signup } from 'components/Signup';
import { Chat } from 'components/Chat';
import { Landing } from 'components/Landing';
import { Switch, Route, useHistory } from 'react-router-dom';

export const App = () => {
  let history = useHistory();
  const authUser = useAuth().authUser;

  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(authUser ? '/' : '/landing');
    }
  }, [authResolved, authUser, history]);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Chat} />
          <Route path="/landing" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <>Loading...</>
  );
};
