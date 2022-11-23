export const FormatDatetime = (dateString: string, separator: string = '/') => {
  const dt = new Date(dateString)
  const year = dt.getFullYear();
  const month = ('0' + (dt.getMonth()+1)).slice(-2);
  const date = ('0' + dt.getDate()).slice(-2);
  const hours = ('0' + dt.getHours()).slice(-2);
  const minutes = ('0' + dt.getMinutes()).slice(-2);

  return (`${year + separator + month + separator + date} ${hours}:${minutes}`);
}

export const FormatDate = (dateString: string, separator: string = '/') => {
  const dt = new Date(dateString)
  const year = dt.getFullYear();
  const month = ('0' + (dt.getMonth()+1)).slice(-2);
  const date = ('0' + dt.getDate()).slice(-2);

  return (`${year + separator + month + separator + date}`);
}
