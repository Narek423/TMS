import colors from '../data/colors';

// eslint-disable-next-line import/prefer-default-export
export const getColorById = (id: string) => {
  return colors.find(i => i.id === id);
};
