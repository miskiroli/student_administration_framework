import React from "react";

const Paginate = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className="col-md">
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-sm justify-content-end">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${
                                currentPage === index + 1 ? "active" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Paginate;
