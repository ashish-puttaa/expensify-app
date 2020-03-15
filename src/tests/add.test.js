const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
   const result = add(3, 4);

   /* if (result !== 7) {
         throw new Error(
            `You added 4 and 3. The result was ${result}. Expected 7.`
         );
      } 
   */

   expect(result).toBe(7);
});

test('should generate greeting', () => {
   const result = generateGreeting('Ash');
   expect(result).toBe('Hello Ash!');
});

test('should generate greeting for no name', () => {
   const result = generateGreeting();
   expect(result).toBe('Hello Anonymous!');
});
