import { useEffect } from 'react';
import { ChatProvider } from 'context';
import 'semantic-ui-css/semantic.min.css';
import { useAuth, useResolved } from 'hooks';
import { Login } from 'components/Login';
import { Signup } from 'components/Signup';
import { Chat } from 'components/Chat';
import { Landing } from 'components/Landing';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Loader } from "semantic-ui-react";

export const App = () => {
  let history = useHistory();
  const authUser = useAuth().authUser;

  const authResolved = useResolved(authUser);

  useEffect(() => {
    // if authResolved if there is an AuthenticatedUser, 
    // then go to Chat otherwise, go to landing page
    if (authResolved) {
      history.push(authUser ? '/' : '/landing');
    }
    // side effect will be triggered when AuthResolved 
    // state is changed, authUser is changed
  }, [authResolved, authUser, history]);

  // if authResolved is true, then the app will appear,
  // otherwise Lodaing component will show
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
    <Loader active inline='centered' />
  );
};
