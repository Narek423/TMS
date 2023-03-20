import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { IColumn, ITaskItem } from '@/types/columns';
import { IChecklistItem } from '@/types/checklists';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '@/types/users';
import { ILabel } from '@/types/label';
import { filterLabelsFromList } from '@/utils/filter-labels-from-list';
import mockLabelsData from '../data/labels';

const LABEL_KEY = 'labels';
const COLUMNS_KEY = 'columnList';

type ProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  columnList: IColumn;
  setColumnList: Dispatch<SetStateAction<IColumn>>;
  labels: ILabel[];
  checkItems: IChecklistItem[];
  // eslint-disable-next-line no-unused-vars
  addColumn: (column: IColumn) => void;
  // eslint-disable-next-line no-unused-vars
  addTaskStorage: (column: IColumn) => void;
  // eslint-disable-next-line no-unused-vars
  addTask: (colId: string, text: string) => void;
  // eslint-disable-next-line no-unused-vars
  addMember: (columnId: string, taskId: string, user: IUser) => void;
  // eslint-disable-next-line no-unused-vars
  addLabel: (columnId: string, taskId: string, label: ILabel) => void;
  // eslint-disable-next-line no-unused-vars
  onAddChecklist: (colId: string, text: string, checklistTitle: string) => void;
  // eslint-disable-next-line no-unused-vars
  deleteChecklist: (colId: string, text: string, checklistId: string) => void;
  onAddCheckItem: (
    // eslint-disable-next-line no-unused-vars
    colId: string,
    // eslint-disable-next-line no-unused-vars
    taskId: string,
    // eslint-disable-next-line no-unused-vars
    checklistId: string,
    // eslint-disable-next-line no-unused-vars
    itemText: string,
  ) => void;
  onDeleteCheckItem: (
    // eslint-disable-next-line no-unused-vars
    colId: string,
    // eslint-disable-next-line no-unused-vars
    taskId: string,
    // eslint-disable-next-line no-unused-vars
    checklistId: string,
    // eslint-disable-next-line no-unused-vars
    checkItemId: string,
  ) => void;

  onSaveHandler: (
    // eslint-disable-next-line no-unused-vars
    columnId: string,
    // eslint-disable-next-line no-unused-vars
    item: ITaskItem,
    // eslint-disable-next-line no-unused-vars
    descriptionTaskName: string,
    // eslint-disable-next-line no-unused-vars
    setDescriptionTaskName: Dispatch<SetStateAction<string>>,
  ) => void;

  // eslint-disable-next-line no-unused-vars
  updateLabels: (labels: ILabel[]) => void;
  // eslint-disable-next-line no-unused-vars
  editLabel: (label: ILabel) => void;
  // eslint-disable-next-line no-unused-vars
  deleteLabel: (labelId: string) => void;
  columnOrder: string[];
  setColumnOrder: Dispatch<SetStateAction<string[]>>;
  // eslint-disable-next-line no-unused-vars
  onChange: (
    // eslint-disable-next-line no-unused-vars
    columnId: string,
    // eslint-disable-next-line no-unused-vars
    taskId: string,
    // eslint-disable-next-line no-unused-vars
    checklistId: string,
    // eslint-disable-next-line no-unused-vars
    checkItemId: string,
  ) => void;
  // eslint-disable-next-line no-unused-vars
  saveDate: (columnId: string, item: ITaskItem, disableTroggl: boolean) => void;
};

export const AppContext = createContext<ContextProps | null>(null);

export const AppContextProvider: FC<ProviderProps> = ({ children }) => {
  const [columnList, setColumnList] = useState<IColumn>({});

  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  const [labels, setLabels] = useState<ILabel[]>([]);

  // eslint-disable-next-line no-shadow
  const updateLabels = (labels: ILabel[]) => {
    setLabels(labels);

    localStorage.setItem(LABEL_KEY, JSON.stringify(labels));
  };

  const editLabel = (updatedLabel: any) => {
    const newLabels = labels.map(label =>
      label.id === updatedLabel.id ? updatedLabel : label,
    );

    setLabels([...newLabels]);
    localStorage.setItem(LABEL_KEY, JSON.stringify(newLabels));
  };

  const deleteLabel = (labelId: string) => {
    const filteredLabels = labels.filter(label => label.id !== labelId);

    setLabels([...filteredLabels]);
    localStorage.setItem(LABEL_KEY, JSON.stringify(filteredLabels));
    const filteredColumns = filterLabelsFromList(columnList, labelId);
    setColumnList(filteredColumns);
    localStorage.setItem(COLUMNS_KEY, JSON.stringify(filteredColumns));
  };

  const onDeleteCheckItem = (
    columnId: string,
    taskId: string,
    checklistId: string,
    checkItemId: string,
  ) => {
    const curentColumn = columnList[columnId];

    if (curentColumn !== undefined) {
      const updatedItems = curentColumn.items.map(item => {
        if (item.id !== taskId) {
          return item;
        }
        const changedList = item.checklists.map(elem => {
          if (elem.id !== checklistId) {
            return elem;
          }
          const filteredItem = elem.checkItems.filter(checkItem => {
            return checkItem.id !== checkItemId;
          });
          return {
            ...elem,
            checkItems: filteredItem,
          };
        });

        return {
          ...item,
          checklists: changedList,
        };
      });

      const updatedColumn = { ...curentColumn, items: updatedItems };

      const updatedColumns = {
        ...columnList,
        [columnId]: updatedColumn,
      };

      setColumnList(updatedColumns as IColumn);
      localStorage.setItem(COLUMNS_KEY, JSON.stringify(updatedColumns));
    }
  };

  const addColumn = (column: IColumn) => {
    const newColumnList = { ...columnList, ...column };
    setColumnList(newColumnList);
    setColumnOrder(Object.keys(newColumnList));
    localStorage.setItem(COLUMNS_KEY, JSON.stringify(newColumnList));
  };

  const addTaskStorage = (column: IColumn) => {
    localStorage.setItem(COLUMNS_KEY, JSON.stringify(column));
  };

  const addTask = (colId: string, text: string) => {
    const columnToChange = columnList[colId];
    columnToChange?.items.push({
      id: uuidv4(),
      task: text,
      members: [],
      labels: [],
      description: '',
      checklists: [],
      date: { title: '', checked: false },
    });
    setColumnList({
      ...columnList,
    });
    addTaskStorage(columnList);
  };

  const addMember = (columnId: string, taskId: string, user: IUser) => {
    const curentColumn = columnList[columnId];
    if (curentColumn !== undefined) {
      const curentTaskIndex = curentColumn.items.findIndex(
        item => item.id === taskId,
      );

      const curentTask = curentColumn.items[curentTaskIndex];

      if (curentTask === undefined) return;

      let members = [];

      const memberIndex = curentTask.members.findIndex(i => i.id === user.id);
      if (memberIndex === -1) {
        members = [...curentTask.members, user];
      } else {
        members = curentTask.members.filter(i => i.id !== user.id);
      }
      const updatedColumn = {
        ...curentColumn,
        items: [
          ...curentColumn.items.slice(0, curentTaskIndex),
          {
            ...curentTask,
            members,
          },
          ...curentColumn.items.slice(
            curentTaskIndex + 1,
            curentColumn.items.length,
          ),
        ],
      };

      const updatedColumns = {
        ...columnList,
        [columnId]: updatedColumn,
      };

      setColumnList(updatedColumns);
      setColumnOrder(Object.keys(updatedColumns));
      localStorage.setItem(COLUMNS_KEY, JSON.stringify(updatedColumns));
    }
  };

  const deleteChecklist = (
    columnId: string,
    taskId: string,
    checklistId: string,
  ) => {
    const curentColumn = columnList[columnId];

    if (curentColumn !== undefined) {
      const updatedItems = curentColumn.items.map(item => {
        if (item.id !== taskId) {
          return item;
        }
        return {
          ...item,
          checklists: item.checklists.filter(i => i.id !== checklistId),
        };
      });
      const updatedColumn = { ...curentColumn, items: updatedItems };

      const updatedColumns = {
        ...columnList,
        [columnId]: updatedColumn,
      };

      setColumnList(updatedColumns);
      localStorage.setItem(COLUMNS_KEY, JSON.stringify(updatedColumns));
    }
  };

  const onAddChecklist = (
    columnId: string,
    taskId: string,
    checklistTitle: string,
  ) => {
    const curentColumn = columnList[columnId];
    if (curentColumn !== undefined) {
      const updatedItems = curentColumn.items.map(item => {
        if (item.id !== taskId) {
          return item;
        }
        return {
          ...item,
          checklists: [
            ...item.checklists,
            {
              id: uuidv4(),
              title: checklistTitle,
              checkItems: [],
            },
          ],
        };
      });
      const updatedColumn = { ...curentColumn, items: updatedItems };

      const updatedColumns = {
        ...columnList,
        [columnId]: updatedColumn,
      };

      setColumnList(updatedColumns);
      localStorage.setItem(COLUMNS_KEY, JSON.stringify(updatedColumns));
    }
  };

  const onAddCheckItem = (
    columnId: string,
    taskId: string,
    checklistId: string,
    itemText: string,
  ) => {
    const curentColumn = columnList[columnId];

    if (curentColumn !== undefined) {
      const updatedItems = curentColumn.items.map(item => {
        if (item.id !== taskId) {
          return item;
        }
        const changedList = item.checklists.map(elem => {
          if (elem.id !== checklistId) {
            return elem;
          }
          return {
            ...elem,
            checkItems: [
              ...elem.checkItems,
              {
                id: uuidv4(),
                label: itemText,
                isDone: false,
              },
            ],
          };
        });

        return {
          ...item,
          checklists: changedList,
        };
      });

      const updatedColumn = { ...curentColumn, items: updatedItems };

      const updatedColumns = {
        ...columnList,
        [columnId]: updatedColumn,
      };

      setColumnList(updatedColumns as IColumn);
      localStorage.setItem(COLUMNS_KEY, JSON.stringify(updatedColumns));
    }
  };

  const onChange = (
    columnId: string,
    taskId: string,
    checklistId: string,
    checkItemId: string,
  ) => {
    const curentColumn = columnList[columnId];

    if (curentColumn !== undefined) {
      const updatedItems = curentColumn.items.map(item => {
        if (item.id !== taskId) {
          return item;
        }
        const changedList = item.checklists.map(elem => {
          if (elem.id !== checklistId) {
            return elem;
          }

          return {
            ...elem,
            checkItems: elem.checkItems.map(checkItem => {
              if (checkItem.id === checkItemId) {
                return {
                  ...checkItem,
                  isDone: !checkItem.isDone,
                };
              }
              return checkItem;
            }),
          };
        });

        return {
          ...item,
          checklists: changedList,
        };
      });

      const updatedColumn = { ...curentColumn, items: updatedItems };

      const updatedColumns = {
        ...columnList,
        [columnId]: updatedColumn,
      };

      setColumnList(updatedColumns as IColumn);
      localStorage.setItem(COLUMNS_KEY, JSON.stringify(updatedColumns));
    }
  };

  const addLabel = (columnId: string, taskId: string, label: ILabel) => {
    const curentColumn = columnList[columnId];
    if (curentColumn === undefined) {
      return;
    }

    const curentTaskIndex = curentColumn.items.findIndex(
      item => item.id === taskId,
    );
    const curentTask = curentColumn.items[curentTaskIndex];

    if (!curentTask) {
      return;
    }

    let taskLabels = [];

    const labelIndex = curentTask.labels.findIndex(e => e === label.id);

    if (labelIndex === -1) {
      taskLabels = [...curentTask.labels, label.id];
    } else {
      taskLabels = curentTask.labels.filter(e => e !== label.id);
    }

    const updatedColumn = {
      ...curentColumn,
      items: [
        ...curentColumn.items.slice(0, curentTaskIndex),
        {
          ...curentTask,
          labels: taskLabels,
        },
        ...curentColumn.items.slice(
          curentTaskIndex + 1,
          curentColumn.items.length,
        ),
      ],
    };

    const updatedColumns = {
      ...columnList,
      [columnId]: updatedColumn,
    };

    setColumnList(updatedColumns);
    setColumnOrder(Object.keys(updatedColumns));
    localStorage.setItem(COLUMNS_KEY, JSON.stringify(updatedColumns));
  };

  useEffect(() => {
    const userDataFrontStorage = localStorage.getItem(COLUMNS_KEY);
    if (userDataFrontStorage) {
      setColumnList(JSON.parse(userDataFrontStorage));
      setColumnOrder(Object.keys(JSON.parse(userDataFrontStorage)));
    }

    const data = localStorage.getItem('labels')
      ? JSON.parse(localStorage.getItem('labels') as string)
      : mockLabelsData;
    updateLabels(data);
  }, []);

  const onSaveHandler = (
    columnId: string,
    item: ITaskItem,
    descriptionTaskName: string,
    setDescriptionTaskName: Dispatch<SetStateAction<string>>,
  ) => {
    if (!descriptionTaskName?.trim()) {
      setDescriptionTaskName('');
      return;
    }

    const updatedItems = columnList[columnId]?.items?.map(elem => {
      if (elem.id === item.id) {
        return { ...elem, description: descriptionTaskName };
      }
      return elem;
    });

    const updatedColumnList = {
      ...columnList,
      [columnId]: { ...columnList[columnId], items: updatedItems },
    } as IColumn;

    setColumnList(updatedColumnList);
    addTaskStorage(updatedColumnList);
  };

  const saveDate = (
    columnId: string,
    item: ITaskItem,
    disableTroggl: boolean,
  ) => {
    const updatedItems = columnList[columnId]?.items?.map((elem: any) => {
      if (elem.id === item.id) {
        return {
          ...elem,
          date: { title: elem.date.title, checked: !disableTroggl },
        };
      }
      return elem;
    });

    const updatedColumnList = {
      ...columnList,
      [columnId]: { ...columnList[columnId], items: updatedItems },
    } as IColumn;

    setColumnList(updatedColumnList);
    addTaskStorage(updatedColumnList);
  };

  const value = {
    columnList,
    setColumnList,
    addColumn,
    addTaskStorage,
    addTask,
    addMember,
    addLabel,
    labels,
    updateLabels,
    editLabel,
    deleteLabel,
    setColumnOrder,
    columnOrder,
    onSaveHandler,
    onAddChecklist,
    deleteChecklist,
    onAddCheckItem,
    onChange,
    onDeleteCheckItem,
    saveDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext) as ContextProps;
};
