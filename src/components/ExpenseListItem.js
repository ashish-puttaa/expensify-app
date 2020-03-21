import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const centsToDollars = amount => {
   // return `$${(amount / 100).toFixed(2)}`;
   return numeral(amount / 100).format('$0,0.00');
};

const millisecondsToDate = timeInMs => {
   return moment(timeInMs).format('MMMM Do, YYYY');
};

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
   <Link className="list-item" to={`/edit/${id}`}>
      <div>
         <h3 className="list-item__title">{description}</h3>
         <span className="list-item__sub-title">{millisecondsToDate(createdAt)}</span>
      </div>
      <h3 className="list-item__data">{centsToDollars(amount)}</h3>
   </Link>
);

export default ExpenseListItem;
