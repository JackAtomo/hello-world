import React from "react";

// <NoteList notes={state.notes} />
function NoteList({ notes, selectedIndex, onNoteSelected }) {
  return (
    <div className="opacity-container ">
      <ul className="m-t-lg">
        {notes.map((note, i) => (
          <li key={note.id} onClick={() => onNoteSelected(i)}>
            <div className={`note-item ${selectedIndex === i && "selected"}`}>
              <div className="container">
                <div style={{ minWidth: "35px" }}>
                  <span className="date">23h</span>
                </div>
                <div className="overflow-hidden">
                  <h5 className="truncate-text title">
                    {note.title || "Untitle note"}
                  </h5>
                  <p className="truncate-multiline-text description">
                    {note.content || "No content"}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { NoteList };
