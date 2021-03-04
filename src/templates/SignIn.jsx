import React, { useState, useCallback } from 'react';
import { push } from 'connected-react-router';

import { useDispatch } from 'react-redux';
import { TextInput } from '../components/UIkit';
import { PrimaryButton } from '../components/UIkit';
import { signIn } from '../reducks/users/operations';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
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
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <div className="center">
        <PrimaryButton
          label="サインイン"
          onClick={() => dispatch(signIn(email, password))}
        />
        <p onClick={() => dispatch(push('/signup'))}>
          アカウントをお持ちでない方はこちら
        </p>
        <p onClick={() => dispatch(push('/signin/reset'))}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignIn;
