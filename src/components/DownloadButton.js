import React from "react";
import * as CSV from "../utils/csv";

function DownloadButton(props) {
  const { data, type } = props;

  const href =
    type === "csv"
      ? `data:text/csv;charset=utf-8,${encodeURI(CSV.stringify(data))}`
      : `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(data)
        )}`;

  return (
    <a href={href} download={`data.${type}`} className="side-box">
      Export csv
    </a>
  );
}

export default DownloadButton;
