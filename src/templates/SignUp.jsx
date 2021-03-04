import React, { useState, useCallback } from 'react';
import { push } from 'connected-react-router';

import { useDispatch } from 'react-redux';
import { TextInput } from '../components/UIkit';
import { PrimaryButton } from '../components/UIkit';
import { signUp } from '../reducks/users/operations';

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value);
  }, []);
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);
  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, []);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium"></div>
      <TextInput
        fullWidth={true}
        label={'ユーザー名'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUsername}
      />
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
      <TextInput
        fullWidth={true}
        label={'パスワード再確認'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className="center">
        <PrimaryButton
          label="アカウントを登録する"
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />
        <p onClick={() => dispatch(push('/signin'))}>
          アカウントをお持ちの方はこちら
        </p>
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push('/signin/reset'))}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;
