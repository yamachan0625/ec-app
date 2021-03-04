import React, { useState, useCallback } from 'react';
import { push } from 'connected-react-router';

import { useDispatch } from 'react-redux';
import { TextInput } from '../components/UIkit';
import { PrimaryButton } from '../components/UIkit';
import { resetPassword } from '../reducks/users/operations';

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">リセットパスワード</h2>
      <div className="module-spacer--medium"></div>
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <div className="center">
        <PrimaryButton
          label="リセットパスワード"
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
      </div>
    </div>
  );
};

export default Reset;
