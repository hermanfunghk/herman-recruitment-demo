import React from "react";

const SearchBox = ({ value, onChange, onBlur, onKeyPress }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      onBlur={(e) => onBlur(e.currentTarget.value)}
      onKeyPress={(e) => onKeyPress(e)}
    />
  );
};

export default SearchBox;
