import React from "react";

const SearchBox = ({ defaultValue, onChange, onBlur, onKeyDown }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      defaultValue={defaultValue}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export default SearchBox;
