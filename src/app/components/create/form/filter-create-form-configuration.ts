export const filterCreateFormConfiguration = [
  {
    type: 'Amount',
    comparisonOperators: ['equals', 'greater than', 'less than'],
    valueType: 'number'
  },
  {
    type: 'Title',
    comparisonOperators: ['equals', 'contains', 'does not equal', 'does not contain', 'starts with', 'ends with'],
    valueType: 'text'
  },
  {
    type: 'Date',
    comparisonOperators: ['before', 'during', 'after'],
    valueType: 'datepicker'
  },
];