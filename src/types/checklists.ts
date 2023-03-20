export interface IChecklistItem {
  id: string;
  label: string;
  isDone: boolean;
}

export interface IChecklist {
  id: string;
  title: string;
  checkItems: IChecklistItem[];
}
