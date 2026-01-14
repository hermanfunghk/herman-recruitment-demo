import { useQuery } from "@tanstack/react-query";
import config from "../config.json";

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_NUM = 1;
const DEFAULT_SORT_COLUMN = {
  path: "stargazers_count",
  sortPath: "stars",
  order: "desc",
};

async function fetchGitHubSearchRepo(queryStr, pageSize, pageNum, sortColumn) {
  const url = new URL(config.gitHubApiSearchRepoUrl);
  url.searchParams.set("q", queryStr);
  url.searchParams.set("sort", sortColumn.sortPath);
  url.searchParams.set("order", sortColumn.order);
  url.searchParams.set("per_page", pageSize);
  url.searchParams.set("page", pageNum);

  const headers = {};
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), { headers });
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 403 && data.message?.includes("rate limit")) {
      throw new Error("GitHub API rate limit exceeded. Please wait a minute and try again.");
    }
    throw new Error(data.message || `GitHub API error: ${response.status}`);
  }
  return data;
}

export function useGitHubSearchRepo(queryStr, pageSize, pageNum, sortColumn) {
  const effectivePageSize = pageSize || DEFAULT_PAGE_SIZE;
  const effectivePageNum = pageNum || DEFAULT_PAGE_NUM;
  const effectiveSortColumn = sortColumn || DEFAULT_SORT_COLUMN;

  return useQuery({
    queryKey: [
      "githubRepos",
      queryStr,
      effectivePageSize,
      effectivePageNum,
      effectiveSortColumn.sortPath,
      effectiveSortColumn.order,
    ],
    queryFn: () =>
      fetchGitHubSearchRepo(
        queryStr,
        effectivePageSize,
        effectivePageNum,
        effectiveSortColumn
      ),
    enabled: queryStr?.trim() !== "",
    staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
    refetchOnWindowFocus: false,
    select: (data) => ({
      items: data.items.map((item) => ({ ...item, _id: item.id })),
      total_count: data.total_count,
    }),
  });
}
