import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibiltyExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const jsx = (
   <Provider store={store}>
      <AppRouter />
   </Provider>
);

ReactDOM.render(<h2>Loading...</h2>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
   ReactDOM.render(jsx, document.getElementById('app'));
});
