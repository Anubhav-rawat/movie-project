import React from "react";

const FilterOptions = ({ options, onChange, heading }) => {
  return (
    <div className="filter-options">
      <h3>{heading}</h3>
        {options.map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              id={option}
              name={option}
              onChange={onChange}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
    </div>
  );
};

export default FilterOptions;
