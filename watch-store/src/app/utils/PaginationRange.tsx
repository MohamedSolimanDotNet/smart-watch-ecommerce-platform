import _ from "lodash";

export default function PaginationRange(totalPage : any, page : any, limit : any, siblings : any) {
  let totalPageNumInArr = 7 + siblings;
  if(totalPageNumInArr >= totalPage) {
    return _.range(1, totalPage + 1);
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = leftSiblingsIndex < totalPage - 2;

  if(!showLeftDots && showRightDots) {
    let leftItemCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemCount + 1);
    return [...leftRange, " ...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemsCount + 1 , totalPage);
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPage];
  }
}