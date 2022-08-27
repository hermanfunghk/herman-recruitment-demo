import React from "react";

const SearchBox = ({ defaultValue, onChange, onBlur, onKeyPress }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      defaultValue={defaultValue}
      onBlur={(e) => onBlur(e)}
      onKeyPress={(e) => onKeyPress(e)}
      onChange={(e) => onChange(e)}
    />
  );
};

export default SearchBox;
