import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = (column) => {
    if (!column.sortPath) return;
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.sortPath === column.sortPath)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.sortPath = column.sortPath;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.sortPath !== sortColumn.sortPath) return null;
    if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortUp} />;
    return <FontAwesomeIcon icon={faSortDown} />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className={column.sortPath ? "clickable" : ""}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
