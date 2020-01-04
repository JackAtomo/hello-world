import React from "react";

function TagsInput({ value = [], onChange }) {
  return (
    <div className="tags-container">
      <ul>
        {value.map(tag => (
          <li key={tag}>
            {tag}
            <button onClick={() => onChange(value.filter(t => t !== tag))}>
              x
            </button>
          </li>
        ))}
        <div className="tags-input-container">
          <input
            type="text"
            placeholder="Enter tag"
            onKeyPress={e => {
              if (value.find(t => t === e.target.value)) {
                return;
              }

              if (e.key === "Enter") {
                onChange([...value, e.target.value]);
                e.target.value = "";
              }
            }}
          />
        </div>
      </ul>
    </div>
  );
}

export { TagsInput };
