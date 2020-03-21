import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from './../components/Header';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
   // rest, only used when destructuring, is an object that contains the other attributes

   return (
      <Route
         {...rest}
         component={props => {
            // props are the props passed through (by) Route to the Component
            return isAuthenticated ? (
               <div>
                  <Header />
                  <Component {...props} />
               </div>
            ) : (
               <Redirect to="/" />
            );
            // Redirect is a component that redirects when rendered
         }}
      />
   );
};

const mapStateToProps = state => ({
   isAuthenticated: !!state.auth.uid // Double flipping to get the boolean values
});

export default connect(mapStateToProps)(PrivateRoute);
