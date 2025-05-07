import React from "react";

function Pagination({ datasetsPerPage, totalDatasets, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDatasets / datasetsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;