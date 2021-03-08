import React from 'react';
import Divider from '@material-ui/core/Divider';
import { OrderedProducts } from './index';
// import { datetimeToString, dateToString } from '../../function/common';
import { TextDetail } from '../UIkit';

const dateToString = (date) => {
  return (
    date.getFullYear() +
    '-' +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + date.getDate()).slice(-2)
  );
};
export const datetimeToString = (dt) => {
  return (
    dt.getFullYear() +
    '-' +
    ('00' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + dt.getDate()).slice(-2) +
    ' ' +
    ('00' + dt.getHours()).slice(-2) +
    ':' +
    ('00' + dt.getMinutes()).slice(-2) +
    ':' +
    ('00' + dt.getSeconds()).slice(-2)
  );
};

const OrderHistoryItem = (props) => {
  const order = props.order;
  const price = '¥' + order.amount.toLocaleString();
  const orderedDatetime = datetimeToString(order.updated_at.toDate());
  const shippingDate = dateToString(order.shipping_date.toDate());

  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={'注文ID'} value={props.order.id} />
      <TextDetail label={'注文日時'} value={orderedDatetime} />
      <TextDetail label={'発送予定日'} value={shippingDate} />
      <TextDetail label={'注文金額'} value={price} />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}
      <div className="module-spacer--extra-extra-small" />
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
