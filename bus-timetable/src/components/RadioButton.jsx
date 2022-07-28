import React from "react";

// stolen from stackoverflow
export function RadioButton ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) {
    return (
      <div>
        <input
          name={name}
          id={id}
          type="radio"
          value={id}
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        /> <label htmlFor={id}>{label}</label>
      </div>
    );
  };