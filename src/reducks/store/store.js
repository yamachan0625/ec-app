import { createStore as reduxCreateStore, combineReducers } from 'redux';
import { UsersReducer } from '../users/reducers';

export default function createStore() {
  // reduxのcreateStoreメソッドの別名
  return reduxCreateStore(
    combineReducers({
      users: UsersReducer,
    })
  );
}
