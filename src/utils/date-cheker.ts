import convertType from './convert-date-type';

const dateChecker = (date: string) => {
  const dueDate = Number(date.split('-').join(''));
  const currentDate = Number(convertType(new Date()).split('-').join(''));
  const subtractionDates = dueDate - currentDate;

  switch (subtractionDates) {
    case -1:
      return ['yesterday', subtractionDates];
    case 0:
      return ['today', subtractionDates];
    case 1:
      return ['tomorrow', subtractionDates];
    default:
      return [
        `${new Date(date).toLocaleString('default', {
          month: 'short',
        })} ${date.slice(-2)}`,
        subtractionDates,
      ];
  }
};
export default dateChecker;
