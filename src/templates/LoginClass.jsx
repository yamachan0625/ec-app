import React from 'react';
export default class LoginClass extends React.Component {
  render() {
    console.log(this.props.users);
    return (
      <div>
        <h2>ログイン</h2>
        <button
          onClick={() => {
            this.props.actions.signIn();
          }}
        >
          ログインする
        </button>
      </div>
    );
  }
}
