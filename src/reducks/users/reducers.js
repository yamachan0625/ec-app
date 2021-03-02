import * as Actions from './actions';
import initislState from '../store/initialState';

export const UsersReducer = (state = initislState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
