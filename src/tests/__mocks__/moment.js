const moment = require.requireActual('moment');

/* This does not work.
   It tries to call the mocked version (itself) and causes the stackTrace Error.

   import moment from 'moment';
*/

export default (timestamp = 0) => {
   return moment(timestamp);
};
