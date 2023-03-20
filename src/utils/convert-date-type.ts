const convertType = (date: Date) => {
  const result = date.toLocaleDateString().split('/').reverse();

  result.push(result[1] as string);
  result.splice(1, 1);

  return result.map(elem => (elem.length <= 1 ? `0${elem}` : elem)).join('-');
};

export default convertType;
