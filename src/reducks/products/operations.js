import { push } from 'connected-react-router';
import { fetchProductsAction, deleteProductAction } from './actions';
import { FirebaseTimestamp, db } from '../../firebase';

const productsRef = db.collection('products');

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductAction(nextProducts));
      });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        const productList = [];
        snapshots.forEach((s) => {
          const product = s.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};

export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  price,
  images,
  sizes
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const data = {
      category,
      description,
      gender,
      images,
      name,
      price: parseInt(price, 10),
      sizes,
      updated_at: timestamp,
    };
    if (id === '') {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/'));
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};
