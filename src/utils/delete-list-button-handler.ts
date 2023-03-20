const deleteListButtonHandler = ({
  columnId,
  setColumnList,
  addTaskStorage,
  onClose,
  columnList,
  setColumnOrder,
}: any) => {
  const columnListCopy = { ...columnList };

  delete columnListCopy?.[columnId];

  setColumnList(columnListCopy);
  setColumnOrder(Object.keys(columnListCopy));
  addTaskStorage(columnListCopy);
  onClose();
};

export default deleteListButtonHandler;
