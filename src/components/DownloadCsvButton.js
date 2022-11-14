import React from "react";

function DownloadCsvButton(props) {
  const { data } = props;
  const jsonToCSV = () => {
    if (data.length) {
      const jsonFields = Object.keys(data[0]);
      var csvStr = jsonFields.join(",") + "\n";

      data.forEach((item) => {
        const arr = jsonFields.map((field) => `"${item[field]}"`);

        csvStr += arr.join(",") + "\n";
      });
      return csvStr;
    }
  };

  return (
    <a
      href={`data:text/csv;charset=utf-8,${encodeURI(jsonToCSV())}`}
      download="data.csv"
      className="json-box"
    >
      Export csv
    </a>
  );
}

export default DownloadCsvButton;
