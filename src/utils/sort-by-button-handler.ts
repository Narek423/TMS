const sortByButtonHandler = ({
  columnId,
  setColumnList,
  addTaskStorage,
  onClose,
  columnList,
}: any) => {
  const columnListCopy = { ...columnList };

  columnListCopy?.[columnId]?.items.sort(
    (a: { task: number }, b: { task: number }) => (a.task >= b.task ? 1 : -1),
  );

  setColumnList(columnListCopy);
  addTaskStorage(columnListCopy);
  onClose();
};

export default sortByButtonHandler;
