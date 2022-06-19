import React, { Component } from "react";
import GitSearchRepoResultTable from "./gitSearchRepoResultTable";
import { getGitHubSearchRepo } from "../services/gitHubSearchRepoService";
//import _ from "lodash";
import SearchBox from "./searchBox";

class GitSearchRepo extends Component {
  state = {
    gitSearchRepoResult: [],
    total_count: 0,
    currentPage: 1,
    pageSize: 25,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "stargazers_count", sortPath: "stars", order: "desc" },
  };

  async componentDidMount() {
    this.searchRepo(this.state.currentPage, this.state.sortColumn);
  }

  async searchRepo(currentPage, sortColumn) {
    if (this.state.searchQuery.trim() === "")
      this.setState({ gitSearchRepoResult: [] });
    else {
      const {
        data: { items: gitSearchRepoResult, total_count },
      } = await getGitHubSearchRepo(
        this.state.searchQuery,
        this.state.pageSize,
        currentPage,
        sortColumn
      );

      gitSearchRepoResult.map((i) => (i._id = i.id));

      this.setState({ gitSearchRepoResult, currentPage, total_count });
    }
  }

  handleSearchChange = async (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  blurHandler = async (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    await this.searchRepo(1, this.state.sortColumn);
  };

  keyPressHandler = async (e) => {
    this.setState({
      searchQuery: e.currentTarget.value,
      selectedGenre: null,
      currentPage: 1,
    });
    if (e.key === "Enter") await this.searchRepo(1, this.state.sortColumn);
  };

  resultRangeStart = () => {
    return (this.state.currentPage - 1) * this.state.pageSize + 1;
  };

  resultRangeEnd = () => {
    return this.resultRangeStart() + this.state.gitSearchRepoResult.length - 1;
  };

  onNextPage = async () => {
    this.searchRepo(this.state.currentPage + 1, this.state.sortColumn);
  };

  onPrevPage = async () => {
    this.searchRepo(this.state.currentPage - 1, this.state.sortColumn);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
    this.searchRepo(this.state.currentPage, sortColumn);
  };

  render() {
    const {
      total_count,
      pageSize,
      sortColumn,
      searchQuery,
      gitSearchRepoResult,
    } = this.state;

    const { length: count } = gitSearchRepoResult;
    const rangeStart = this.resultRangeStart();
    const rangeEnd = this.resultRangeEnd();

    if (count === 0)
      return (
        <div>
          <p>There are no matched git repository.</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearchChange}
            onBlur={this.blurHandler}
            onKeyPress={this.keyPressHandler}
          />
        </div>
      );

    return (
      <div className="row">
        <div className="col">
          <p>Total {total_count} git repositories found.</p>
          <p>
            Showing {rangeStart} - {rangeEnd} git repositories.
          </p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearchChange}
            onBlur={this.blurHandler}
            onKeyPress={this.keyPressHandler}
          />
          {rangeStart > 1 && (
            <a
              className="btn btn-primary m-1"
              onClick={() => this.onPrevPage()}
            >
              Prev {pageSize}
            </a>
          )}
          {total_count > rangeEnd && (
            <a
              className="btn btn-primary m-1"
              onClick={() => this.onNextPage()}
            >
              Next {pageSize}
            </a>
          )}
          <GitSearchRepoResultTable
            gitSearchRepoResult={this.state.gitSearchRepoResult}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
        </div>
      </div>
    );
  }
}

export default GitSearchRepo;
