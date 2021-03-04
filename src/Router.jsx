import { Switch, Route } from 'react-router';
import { Home, Signup, SignIn, Reset } from './templates';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={Signup} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/reset'} component={Reset} />
      <Auth>
        <Route exact path={'(/)?'} component={Home} />
      </Auth>
    </Switch>
  );
};
export default Router;
