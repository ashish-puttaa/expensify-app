export default expenses => {
   return expenses
      .map(expense => expense.amount)
      .reduce((acc, amount) => acc + amount, 0); // 0 -> accumulator initial value;

   /* Version 2
   
   const amounts = expenses.map(expense => expense.amount);
   const total = amounts.reduce((acc, amount) => acc + amount, 0); // 0 -> accumulator initial value
   return total; 
   */

   /* Version 1

   if (expenses.length === 0) {
      return 0;
   }
   const amounts = expenses.map(expense => expense.amount);
   const total = amounts.reduce((acc, amount) => acc + amount); 
   return total; 
   */
};
