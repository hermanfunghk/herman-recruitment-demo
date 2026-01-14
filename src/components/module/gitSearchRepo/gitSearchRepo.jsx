import React, { useState } from "react";
import GitSearchRepoResultTable from "./gitSearchRepoResultTable";
import { useGitHubSearchRepo } from "../../../services/gitHubSearchRepoService";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import SearchBox from "../../common/searchBox";

const GitSearchRepo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(25);
  const [inputValue, setInputValue] = useState("oracle");
  const [sortColumn, setSortColumn] = useState({
    path: "stargazers_count",
    sortPath: "stars",
    order: "desc",
  });

  const debouncedSearchQuery = useDebouncedValue(inputValue, 500);

  const { data, isLoading, error } = useGitHubSearchRepo(
    debouncedSearchQuery,
    pageSize,
    currentPage,
    sortColumn
  );

  const gitSearchRepoResult = data?.items || [];
  const total_count = data?.total_count || 0;

  const handleSearchChange = (e) => {
    setInputValue(e.currentTarget.value);
    setCurrentPage(1);
  };

  const handleSort = (newSortColumn) => {
    setSortColumn(newSortColumn);
  };

  const blurHandler = (e) => {
    setInputValue(e.currentTarget.value);
    setCurrentPage(1);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      setInputValue(e.currentTarget.value);
      setCurrentPage(1);
    }
  };

  const resultRangeStart = () => {
    return (currentPage - 1) * pageSize + 1;
  };

  const resultRangeEnd = () => {
    return resultRangeStart() + gitSearchRepoResult.length - 1;
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const rangeStart = resultRangeStart();
  const rangeEnd = resultRangeEnd();
  const count = gitSearchRepoResult.length;
  const showPrevButton = rangeStart > 1;
  const showNextButton = total_count > rangeEnd;

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading git repositories...</p>;
    }

    if (error) {
      return <p>Error loading repositories: {error.message}</p>;
    }

    if (count === 0) {
      return <p>There are no matched git repository.</p>;
    }

    return (
      <>
        <p>Total {total_count} git repositories found.</p>
        <p>Showing {rangeStart} - {rangeEnd} git repositories.</p>
        {showPrevButton && (
          <a className="btn btn-primary m-1" onClick={onPrevPage}>
            Prev {pageSize}
          </a>
        )}
        {showNextButton && (
          <a className="btn btn-primary m-1" onClick={onNextPage}>
            Next {pageSize}
          </a>
        )}
        <GitSearchRepoResultTable
          gitSearchRepoResult={gitSearchRepoResult}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
      </>
    );
  };

  return (
    <div className="row">
      <div className="col">
        <SearchBox
          defaultValue={inputValue}
          onChange={handleSearchChange}
          onBlur={blurHandler}
          onKeyDown={keyDownHandler}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default GitSearchRepo;
