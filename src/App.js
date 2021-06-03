import { useEffect } from 'react';
import { Chat } from 'components/Chat';
import { ChatProvider } from 'context';
import 'semantic-ui-css/semantic.min.css';
import { useAuth, useResolved } from 'hooks';
import { Login } from 'components/Login';
import { Signup } from 'components/Signup';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Dimmer, Loader }  from "semantic-ui-react";
import Landing from 'components/Landing';

export const App = () => {
  const history = useHistory();
  const { authenticatedUser } = useAuth();
  const authResolved = useResolved(authenticatedUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authenticatedUser ? '/' : '/login');
    }
  }, [authResolved, authenticatedUser, history]);

  return authResolved ? (
    <ChatProvider authenticatedUser={authenticatedUser}>
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
    <>
      <Dimmer active>
        <Loader />
      </Dimmer>
    </>
  );
};
