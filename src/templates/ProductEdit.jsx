import React, { useState, useEffect } from 'react';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../reducks/products/operations';
import ImageArea from '../components/products/ImageArea';
import { db } from '../firebase';

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/product/edit')[1];

  if (id !== '') {
    id = id.split('/')[1];
  }

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const categories = [
    { id: 'tops', name: 'トップス' },
    { id: 'shirts', name: 'シャツ' },
  ];

  const genders = [
    { id: 'all', name: '全て' },
    { id: 'mens', name: 'メンズ' },
    { id: 'redies', name: 'レディース' },
  ];

  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          console.log(data);
          setName(data.name);
          setImages(data.images);
          setGender(data.gender);
          setCategory(data.category);
          setDescription(data.description);
          setPrice(data.price);
        });
    }
  }, [id]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録と編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'商品名'}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={'text'}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          fullWidth={true}
          label={'商品説明'}
          multiline={true}
          required={true}
          rows={1}
          value={description}
          type={'text'}
          onChange={(e) => setDescription(e.target.value)}
        />
        <SelectBox
          label={'性別'}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        />
        <SelectBox
          label={'カテゴリー'}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <TextInput
          fullWidth={true}
          label={'価格'}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={'number'}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() =>
              dispatch(
                saveProduct(name, description, category, gender, price, images)
              )
            }
          ></PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
