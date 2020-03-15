import { createStore } from 'redux';

// Action Generators - functions that return action objects

// Version 0
// const incrementCount = options =>
//    Object.assign(
//       {
//          type: 'INCREMENT'
//       },
//       options
//    );

// Version 1
// const incrementCount = (payload = {}) => ({
//    type: 'INCREMENT',
//    incrementBy:
//       typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

// Version 2
const incrementCount = ({ incrementBy = 1 } = {}) => ({
   type: 'INCREMENT',
   incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
   type: 'DECREMENT',
   decrementBy
});

const setCount = ({ count }) => ({
   type: 'SET',
   count
});

const resetCount = () => ({
   type: 'RESET'
});

// Reducers
// 1. Are pure functions
// 2. Never change (mutate) state or action

const countReducer = (state = { count: 0 }, action) => {
   // console.log(action);
   switch (action.type) {
      case 'INCREMENT':
         return {
            count: state.count + action.incrementBy
         };
      case 'DECREMENT':
         return {
            count: state.count - action.decrementBy
         };
      case 'SET':
         const newCount = action.count;
         return {
            count: newCount
         };
      case 'RESET':
         return {
            count: 0
         };
      default:
         return state;
   }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
   console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 8 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 5 }));

store.dispatch(setCount({ count: 111 }));

// console.log(store.getState());
