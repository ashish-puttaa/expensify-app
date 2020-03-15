// Get Visible Expenses

import moment from 'moment';

/* args - expenses, filters

   filters - object :
      text, sortBy -> String
      startDate, endDate -> moment instances/objects

   expenses - array of objects :
      description, note, id -> String
      createdAt, amount -> number
*/

export default (expenses, { text, sortBy, startDate, endDate }) => {
   return expenses
      .filter(expense => {
         const createdAtMoment = moment(expense.createdAt);

         const startDateMatch = startDate
            ? startDate.isSameOrBefore(createdAtMoment, 'day')
            : true;

         const endDateMatch = endDate
            ? endDate.isSameOrAfter(createdAtMoment, 'day')
            : true;

         const textMatch = expense.description
            .toLowerCase()
            .includes(text.toLowerCase());

         return startDateMatch && endDateMatch && textMatch;
      })
      .sort((a, b) => {
         if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
            // acutally -1 : 1, but this code shows most recent expenses first
         } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
         }
      });
};

/* const startDateMatch =
   typeof startDate !== 'number' || expense.createdAt >= startDate;

const endDateMatch =
   typeof endDate !== 'number' || expense.createdAt <= endDate; */
