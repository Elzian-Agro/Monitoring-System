// Download CSV
function convertArrayOfObjectsToCSV(data) {
  let result;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

export function downloadCSV(data) {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(data);
  if (csv == null) return;

  const filename = 'users.csv';

  if (!RegExp(/^data:text\/csv/i).exec(csv)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
}
