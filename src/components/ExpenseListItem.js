import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const centsToDollars = amount => {
   return `$${(amount / 100).toFixed(2)}`;
};

const millisecondsToDate = timeInMs => {
   return moment(timeInMs).format('MMM Do, YYYY');
};

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
   <div>
      <Link to={`/edit/${id}`}>
         <h3>{description}</h3>
      </Link>

      <p>
         {centsToDollars(amount)} - {millisecondsToDate(createdAt)}
      </p>
   </div>
);

export default ExpenseListItem;
