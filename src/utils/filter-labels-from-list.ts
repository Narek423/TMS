import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '@/types/columns';

// eslint-disable-next-line import/prefer-default-export
export const filterLabelsFromList = (columnList: IColumn, id: string) => {
  const filteredArrayList = Object.values(columnList).map(column => {
    const filteredItems = column.items.map(task => {
      return {
        ...task,
        labels: task.labels.filter(labelId => labelId !== id),
      };
    });

    return {
      ...column,
      items: filteredItems,
    };
  });

  return filteredArrayList.reduce(
    (acc, current) => ({
      ...acc,
      [uuidv4()]: current,
    }),
    {},
  );
};
