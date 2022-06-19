import http from "./httpService";
import { gitHubApiSearchRepoUrl } from "../config.json";

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_NUM = 1;
const DEFAULT_SORT_COLUMN = {
  path: "stargazers_count",
  sortPath: "star",
  order: "desc",
};

export function getGitHubSearchRepo(queryStr, pageSize, pageNum, sortColumn) {
  if (!pageSize) pageSize = DEFAULT_PAGE_SIZE;
  if (!pageNum) pageNum = DEFAULT_PAGE_NUM;
  if (!sortColumn) sortColumn = DEFAULT_SORT_COLUMN;

  return http.get(
    gitHubApiSearchRepoUrl +
      "?q=" +
      queryStr +
      "&sort=" +
      sortColumn.sortPath +
      "&order=" +
      sortColumn.order +
      "&per_page=" +
      pageSize +
      "&page=" +
      pageNum
  );
}
