import deleteAllButtonHandler from '@/utils/deleteAllButtonHandler';
import deleteListButtonHandler from '@/utils/delete-list-button-handler';
import sortByButtonHandler from '@/utils/sort-by-button-handler';

const listActionButtons = [
  {
    name: 'Add card…',
    action: () => {},
    hasBreakLine: false,
    key: 'Add',
  },
  {
    name: 'Copy list…',
    action: () => {},
    hasBreakLine: false,
    key: 'Copy',
  },
  {
    name: 'Move list…',
    action: () => {},
    hasBreakLine: true,
    key: 'Move list',
  },
  {
    name: 'Sort by…',
    action: sortByButtonHandler,
    hasBreakLine: true,
    key: 'Sort',
  },
  {
    name: 'Move all cards in this list…',
    action: () => {},
    hasBreakLine: false,
    key: 'Move all',
  },
  {
    name: 'Delete all cards in this list…',
    action: deleteAllButtonHandler,
    hasBreakLine: true,
    key: 'Delete all',
  },
  {
    name: 'Delete this list',
    action: deleteListButtonHandler,
    hasBreakLine: false,
    key: 'Delete list',
  },
];

export default listActionButtons;
