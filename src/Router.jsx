import { Switch, Route } from 'react-router';
import {
  Home,
  Signup,
  SignIn,
  Reset,
  ProductEdit,
  ProductList,
  ProductDetail,
  CartList,
  OrderConfirm,
  OrderHistory,
} from './templates';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={Signup} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/reset'} component={Reset} />

      <Auth>
        <Route exact path={'(/)?'} component={ProductList} />
        <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
        <Route exact path={'/product/:id'} component={ProductDetail} />
        <Route exact path={'/cart'} component={CartList} />
        <Route exact path={'/order/confirm'} component={OrderConfirm} />
        <Route exact path={'/order/history'} component={OrderHistory} />
      </Auth>
    </Switch>
  );
};
export default Router;
