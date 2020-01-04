import React from "react";

function TagList({ tags, selectedIndex, onSelectTag }) {
  return (
    <ul class="tag-list p-t-md">
      <li
        className={`${selectedIndex === null && "selected"}`}
        onClick={() => onSelectTag(null)}
      >
        <p class="tag-list-item">All notes</p>
      </li>

      {tags.map((tag, index) => (
        <li
          className={`${selectedIndex === index && "selected"}`}
          onClick={() => onSelectTag(index)}
        >
          <p className="tag-list-item"># {tag}</p>
        </li>
      ))}
    </ul>
  );
}

export { TagList };
