import { push } from 'connected-react-router';
import {
  fetchProductsAction,
  deleteProductAction,
  fetchOrdersHistoryAction,
} from './actions';
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

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = [];
    let soldOutProducts = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productid).get();
      const sizes = snapshot.data().sizes;

      const updatedSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          }
          return { size: size.size, quantity: size.quantity - 1 };
        }
        return size;
      });

      products.push({
        id: product.productid,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      batch.update(productsRef.doc(product.productid), { sizes: updatedSizes });
      batch.delete(userRef.collection('cart').doc(product.cartId));
    }
    if (soldOutProducts.length > 0) {
      const errMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join('と')
          : soldOutProducts[0];

      alert('すみません' + errMessage + 'が在庫切れとなったため中断しました');
    } else {
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection('orders').doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );

          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          };

          orderRef.set(history);
          dispatch(push('/order/complete'));
        })
        .catch((err) => {
          alert('注文失敗');
        });
    }
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
