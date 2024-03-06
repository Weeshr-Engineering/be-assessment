export function paginate(limit: string, page: string, result: any[]) {
  const pageLimit = parseInt(limit) || 30;
  const pageCount = Math.ceil(result.length / pageLimit);
  let currPage = parseInt(page) || 1;

  if (currPage > pageCount) {
    currPage = pageCount;
  }

  const start = (currPage - 1) * pageLimit;
  const end = start + pageLimit;
  const paginatedResult = result.slice(start, end);

  return { paginatedResult, currPage, pageCount };
}
