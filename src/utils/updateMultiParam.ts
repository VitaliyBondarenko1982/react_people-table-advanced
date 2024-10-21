const updateMultiParam = (centuries: string[], century: string) => {
  return centuries.includes(century)
    ? centuries.filter(c => century !== c)
    : [...centuries, century];
};

export default updateMultiParam;
