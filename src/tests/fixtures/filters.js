import moment from 'moment';

const filtersDefault = {
   text: '',
   sortBy: 'date',
   startDate: undefined,
   endDate: undefined
};

const filters = {
   text: 'bills',
   sortBy: 'amount',
   startDate: moment(0),
   endDate: moment(0).add(5, 'days')
};

export { filtersDefault, filters };
