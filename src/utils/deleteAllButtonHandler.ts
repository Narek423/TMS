const deleteAllButtonHandler = ({
  columnId,
  setColumnList,
  addTaskStorage,
  onClose,
  columnList,
}: any) => {
  const columnListCopy = { ...columnList };

  columnListCopy?.[columnId]?.items.splice(0);

  setColumnList(columnListCopy);
  addTaskStorage(columnListCopy);
  onClose();
};

export default deleteAllButtonHandler;
