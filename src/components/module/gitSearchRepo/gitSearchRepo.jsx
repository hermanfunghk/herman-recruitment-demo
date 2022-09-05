import React, { useState, useEffect } from "react";
import GitSearchRepoResultTable from "./gitSearchRepoResultTable";
import { getGitHubSearchRepo } from "../../../services/gitHubSearchRepoService";
//import _ from "lodash";
import SearchBox from "../../common/searchBox";

const GitSearchRepo = () => {
  const [gitSearchRepoResult, setGitSearchRepoResult] = useState([]);
  const [total_count, setTotal_count] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState("oracle");
  const [sortColumn, setSortColumn] = useState({
    path: "stargazers_count",
    sortPath: "stars",
    order: "desc",
  });

  const searchRepo = async () => {
    if (searchQuery.trim() === "") setGitSearchRepoResult([]);
    else {
      const {
        data: { items: gitSearchRepoResult, total_count },
      } = await getGitHubSearchRepo(
        searchQuery,
        pageSize,
        currentPage,
        sortColumn
      );

      gitSearchRepoResult.map((i) => (i._id = i.id));

      setGitSearchRepoResult(gitSearchRepoResult);
      setTotal_count(total_count);
    }
  };

  useEffect(() => {
    // call the function
    searchRepo()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const handleSearchChange = async (e) => {
    setSearchQuery(e.currentTarget.value);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    searchRepo();
  };

  const blurHandler = async (e) => {
    setSearchQuery(e.currentTarget.value);
    setCurrentPage(1);
    await searchRepo();
  };

  const keyPressHandler = async (e) => {
    setSearchQuery(e.currentTarget.value);
    setCurrentPage(1);
    if (e.key === "Enter") await searchRepo();
  };

  const resultRangeStart = () => {
    return (currentPage - 1) * pageSize + 1;
  };

  const resultRangeEnd = () => {
    return resultRangeStart() + gitSearchRepoResult.length - 1;
  };

  const onNextPage = async () => {
    setCurrentPage(currentPage + 1);
    setSortColumn(sortColumn);
    searchRepo();
  };

  const onPrevPage = async () => {
    setCurrentPage(currentPage - 1);
    setSortColumn(sortColumn);
    searchRepo();
  };

  /*const handleSort = (sortColumn) => {
    this.setState({ sortColumn });
    this.searchRepo(this.state.currentPage, sortColumn);
  };*/

  const { length: count } = gitSearchRepoResult;
  const rangeStart = resultRangeStart();
  const rangeEnd = resultRangeEnd();

  if (count === 0)
    return (
      <div>
        <p>There are no matched git repository.</p>
        <SearchBox
          defaultValue={searchQuery}
          onBlur={blurHandler}
          onKeyPress={keyPressHandler}
        />
      </div>
    );

  return (
    <div className="row">
      <div className="col">
        <p>Total {total_count} git repositories found.</p>
        <p>
          Showing {resultRangeStart()} - {resultRangeEnd()} git repositories.
        </p>
        <SearchBox
          defaultValue={searchQuery}
          onChange={handleSearchChange}
          onBlur={blurHandler}
          onKeyPress={keyPressHandler}
        />
        {rangeStart > 1 && (
          <a className="btn btn-primary m-1" onClick={() => onPrevPage()}>
            Prev {pageSize}
          </a>
        )}
        {total_count > rangeEnd && (
          <a className="btn btn-primary m-1" onClick={() => onNextPage()}>
            Next {pageSize}
          </a>
        )}
        <GitSearchRepoResultTable
          gitSearchRepoResult={gitSearchRepoResult}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default GitSearchRepo;
