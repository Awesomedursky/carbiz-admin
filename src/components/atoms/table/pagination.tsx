import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          className=" p-1"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          variant="outline"
        >
          <ChevronLeft className="" />
          Prev
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          variant="outline"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
