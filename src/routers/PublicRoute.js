import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
   // rest, only used when destructuring, is an object that contains the other attributes

   return (
      <Route
         {...rest}
         component={props => {
            // props are the props passed through (by) Route to the Component
            return !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />;
            // Redirect is a component that redirects when rendered
         }}
      />
   );
};

const mapStateToProps = state => ({
   isAuthenticated: !!state.auth.uid // Double flipping to get the boolean values
});

export default connect(mapStateToProps)(PublicRoute);
