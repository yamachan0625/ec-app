import * as Actions from './actions';
import initislState from '../store/initialState';

export const ProductsReducer = (state = initislState.products, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
