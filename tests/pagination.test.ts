import { expect, test } from "vitest";
import { paginate } from "../src/modules/utils/pagination";

test("calculates the correct start value for pagination", () => {
  const limit = "10";
  const page = "2";
  const result = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const { paginatedResult, currPage, pageCount } = paginate(
    limit,
    page,
    result
  );

  const expectedStart = 10;
  const expectedEnd = 20;

  expect(currPage).toBe(2);
  expect(pageCount).toBe(2);
  expect(paginatedResult).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
});
