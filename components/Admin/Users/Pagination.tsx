import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handleNextPage, handlePreviousPage, setCurrentPage }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const leftSide = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const rightSide = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

    if (leftSide > 1) {
      pages.push(1);
      if (leftSide > 2) {
        pages.push('...');
      }
    }

    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    if (rightSide < totalPages) {
      if (rightSide < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === 'number' ? (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 mx-1 text-sm rounded ${currentPage === page ? 'bg-yellow-400' : 'bg-gray-200'}`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-3 py-1 mx-1 text-sm text-gray-500">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="flex justify-center mt-4 text-sm">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:bg-gray-100 text-sm"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:bg-gray-100 text-sm"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
