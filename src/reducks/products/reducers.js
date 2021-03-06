import * as Actions from './actions';
import initislState from '../store/initialState';

export const ProductsReducer = (state = initislState.products, action) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return { ...state, list: [...action.payload] };
    case Actions.DELETE_PRODUCTS:
      return { ...state, list: [...action.payload] };

    default:
      return state;
  }
};
