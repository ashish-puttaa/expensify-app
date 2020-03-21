import React from 'react';
import { startLogin } from './../actions/auth';
import { connect } from 'react-redux';

export const LoginPage = props => (
   <div>
      <h1>Login Page</h1>
      <button onClick={props.startLogin}>Login</button>
   </div>
);

const mapDispatchToProps = dispatch => ({
   startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
