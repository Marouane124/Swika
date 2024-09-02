import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  setCurrentPage
}) => {
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
      <IconButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="mx-1"
      >
        <ArrowBackIcon />
      </IconButton>
      {renderPageNumbers()}
      <IconButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="mx-1"
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
