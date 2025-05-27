import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useMemo } from "react";

// export function Pagination({ table }: { table: any }) {
//   const pageIndex = table.getState().pagination.pageIndex;
//   const pageCount = table.getPageCount();
//   const pageSize = table.getState().pagination.pageSize;
//   const total = table.getFilteredRowModel().rows.length;

//   const currentStart = pageIndex * pageSize + 1;
//   const currentEnd = Math.min((pageIndex + 1) * pageSize, total);

//   // Create a compact range: [1, 2, 3, ..., 50]
//   const visiblePages = useMemo(() => {
//     // const range = [];
//     const siblingCount = 1;
//     const totalNumbers = siblingCount * 2 + 5;

//     if (pageCount <= totalNumbers) {
//       return Array.from({ length: pageCount }, (_, i) => i + 1);
//     }

//     const leftSiblingIndex = Math.max(pageIndex - siblingCount, 1);
//     const rightSiblingIndex = Math.min(pageIndex + siblingCount + 1, pageCount);

//     const shouldShowLeftDots = leftSiblingIndex > 2;
//     const shouldShowRightDots = rightSiblingIndex < pageCount - 1;

//     const firstPageIndex = 1;
//     const lastPageIndex = pageCount;

//     if (!shouldShowLeftDots && shouldShowRightDots) {
//       const leftItems = Array.from(
//         { length: 3 + 2 * siblingCount },
//         (_, i) => i + 1
//       );
//       return [...leftItems, "...", lastPageIndex];
//     }

//     if (shouldShowLeftDots && !shouldShowRightDots) {
//       const rightItems = Array.from(
//         { length: 3 + 2 * siblingCount },
//         (_, i) => pageCount - (4 - i)
//       );
//       return [firstPageIndex, "...", ...rightItems];
//     }

//     const middleItems = Array.from(
//       { length: 2 * siblingCount + 1 },
//       (_, i) => leftSiblingIndex + i
//     );
//     return [firstPageIndex, "...", ...middleItems, "...", lastPageIndex];
//   }, [pageIndex, pageCount]);

//   return (
// <div className="flex items-center justify-between border-t p-5 md:p-8 w-full flex-wrap gap-1.5 my-2">
// <div className="text-muted-foreground md:text-base font-[500] mb-2.5">
//   Showing {currentStart}–{currentEnd} of {total}
// </div>

// <div className="flex items-center gap-2 flex-1 justify-center">
//   <Button
// variant="outline"
// size="lg"
//     onClick={() => table.previousPage()}
//     disabled={!table.getCanPreviousPage()}
//   >
//     <ChevronLeft className="h-4 w-4 mr-1" />
//     Prev
//   </Button>

//   {visiblePages.map((page, i) =>
//     page === "..." ? (
//       <span key={i} className="px-2 text-muted-foreground">
//         ...
//       </span>
//     ) : (
//       <Button
//         key={i}
//         variant={pageIndex === page - 1 ? "outline" : "ghost"}
//         size="lg"
//         onClick={() => table.setPageIndex(page - 1)}
//         className={`"px-4 text-[#74737D] border-none ${
//           pageIndex === page - 1 ? "bg-[#F7F7F8] text-black" : ""
//         } `}
//       >
//         {page}
//       </Button>
//     )
//   )}

//   <Button
//     variant="outline"
//     size="lg"
//     onClick={() => table.nextPage()}
//     disabled={!table.getCanNextPage()}
//   >
//     Next
//     <ChevronRight className="h-4 w-4 ml-1" />
//   </Button>
// </div>
//     </div>
//   );
// }

interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-between border-t p-5 md:p-8 w-full flex-wrap gap-1.5 my-2">
      <div className="text-muted-foreground text-sm font-medium mb-2.5">
        Showing {currentPage} - {pageSize} of {total}
      </div>
      <div className="flex items-center gap-2 flex-1 justify-center">
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          variant="outline"
          size="lg"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          variant="outline"
          size="lg"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
