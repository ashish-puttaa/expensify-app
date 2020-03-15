// arguments object - no longer bound with arrow functions

const add = function(a, b) {
   console.log(arguments);
   return a + b;
};

console.log(add(4, 5, "asdasd"));

const addNew = (a, b) => {
   // console.log(arguments);
   return a + b;
};

console.log(addNew(2, 4));

// this keyword - no longer bound in arrow functions

const multiplier = {
   numbers: [5, 2],
   multiplyBy: 2,
   multiply() {
      // Similar to multiply: function() {}
      console.log(this); // this -> multiplier object, arrow functions take 'this' as 'this' of parent

      return this.numbers.map(number => number * this.multiplyBy);
   }
};

console.log(multiplier.multiply());
