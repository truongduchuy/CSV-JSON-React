export const parse = (dataString) => {
  const dataStringLines = dataString.split(/\r\n|\n/);
  const headers = dataStringLines[0].split(
    /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
  );

  const list = [];
  for (let i = 1; i < dataStringLines.length; i++) {
    const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    if (headers && row.length === headers.length) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        let d = row[j];
        if (d.length > 0) {
          if (d[0] === '"') d = d.substring(1, d.length - 1);
          if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
        }
        if (headers[j]) {
          obj[headers[j]] = d;
        }
      }

      // remove the blank rows
      if (Object.values(obj).filter((x) => x).length > 0) {
        list.push(obj);
      }
    }
  }

  return list;
};

export const stringify = (data) => {
  if (data.length) {
    const jsonFields = Object.keys(data[0]);
    var csvStr = jsonFields.join(",") + "\n";

    data.forEach((item, index) => {
      const arr = jsonFields.map((field) => {
        const value = item[field];
        if (value.includes(",")) {
          return `"${value}"`;
        }

        return value;
      });

      const breakLine = index === data.length - 1 ? "" : "\n";
      csvStr += arr.join(",") + breakLine;
    });
    return csvStr;
  }
};
