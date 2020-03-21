import authReducer from './../../reducers/auth';

test('should set uid when login action is called', () => {
   const action = {
      type: 'LOGIN',
      uid: 1
   };

   const state = authReducer({}, action);
   expect(state).toEqual({
      uid: 1
   });
});

test('should unset uid when logout action is called', () => {
   const action = {
      type: 'LOGOUT'
   };

   const state = authReducer({}, action);
   expect(state).toEqual({});
});
