import { IChecklist } from '@/types/checklists';
import { IUser } from './users';

export interface ITaskItem {
  date: any;
  id: string;
  task: string;
  members: IUser[];
  labels: string[];
  description: string;
  checklists: IChecklist[];
}

export interface IColumn {
  [id: string]: {
    title: string;
    items: ITaskItem[];
  };
}
