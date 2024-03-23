import React from "react";

const Search = ({ searchStudent, handleSearchChange }) => {
    return (
        <div className="col-md-4 mt-5">
            <label htmlFor="search" className="mb-2">
                SEARCH FOR STUDENTS
            </label>
            <input
                type="search"
                name="search"
                className="form-control input-border-orange"
                value={searchStudent}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default Search;
