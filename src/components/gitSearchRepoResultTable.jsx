import React, { Component } from "react";
import Table from "./common/table";

class GitSearchRepoResultTable extends Component {
  columns = [
    { path: "stargazers_count", sortPath: "stars", label: "Star" },
    {
      path: "full_name",
      label: "Full Name",
    },
    { path: "owner.login", label: "Owner" },
    {
      path: "html_url",
      label: "Readme",
      content: (gitRepo) => (
        <a href={gitRepo.html_url + "#readme"} target="_blank">
          {gitRepo.html_url}
        </a>
      ),
    },
  ];

  render() {
    const { gitSearchRepoResult, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={gitSearchRepoResult}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default GitSearchRepoResultTable;
