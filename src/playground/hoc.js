// Higher Order Component (HOC) - A component (HOC) that renders another component
/* Uses :
   1. Reuse code
   2. Render hijacking
   3. Prop manipulation
   4. Abstract State
*/
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
   <div>
      <h1>Info</h1>
      <p>The info is : {props.info}</p>
   </div>
);

const withAdminWarning = WrappedComponent => {
   return props => (
      <div>
         {props.isAdmin && <p>This is private info. Please don't share.</p>}
         <WrappedComponent {...props} />
      </div>
   );
};

const requireAuthentication = WrappedComponent => {
   return props => (
      <div>
         {props.isAuthenticated ? (
            <WrappedComponent {...props} />
         ) : (
            <p>Please authenicate to view contents</p>
         )}
      </div>
   );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(
//    <AdminInfo isAdmin={true} info="an info" />,
//    document.getElementById('app')
// );

ReactDOM.render(
   <AuthInfo isAuthenticated={true} info="an info" />,
   document.getElementById('app')
);
