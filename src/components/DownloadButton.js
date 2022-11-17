import React from "react";

function DownloadButton(props) {
  const { data = "", type } = props;

  const href =
    type === "csv"
      ? `data:text/csv;charset=utf-8,${encodeURI(data)}`
      : `data:text/json;charset=utf-8,${encodeURIComponent(data)}`;

  return (
    <a href={href} download={`data.${type}`}>
      <i class="fa fa-download"></i>
    </a>
  );
}

export default DownloadButton;
