import { ILabel } from '@/types/label';

// eslint-disable-next-line import/prefer-default-export
export const getLabelById = (labels: ILabel[], id: string) => {
  return labels.find(i => i.id === id);
};
