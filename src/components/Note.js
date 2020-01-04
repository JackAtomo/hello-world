import React, { useState, useEffect, useRef } from 'react';
import { TagsInput } from './TagsInput';

function Note({ defaultNote = {}, onSaveNote, onDeleteNote }) {
  const [note, setNote] = useState(defaultNote);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setNote(defaultNote);
    autoSize(titleRef.current);
    autoSize(contentRef.current);
  }, [defaultNote]);

  const autoSize = element => {
    if (element) {
      element.style.height = element.scrollHeight + 'px';
    }
  };

  return (
    <div className="note">
      <textarea
        ref={titleRef}
        id="title"
        className="title"
        placeholder="Untitled Note"
        value={note.title}
        onChange={e => setNote({ ...note, title: e.target.value })}
        onInput={e => autoSize(e.target)}
        onBlur={e => {
          onSaveNote(note);
        }}
      />

      {/* <TagsInput value onChange> INICIO - Permitir entrar tags */}

      <TagsInput
        value={note.tags}
        onChange={tags => {
          const noteToSave = { ...note, tags };
          setNote(noteToSave);
          onSaveNote(noteToSave);
        }}
      />

      {/* </ TagsInput> FIN */}

      <div className="note-container">
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            onDeleteNote(note.id);
          }}
        >
          Remove
          <button className="icon-button remove" />
        </a>
      </div>

      <textarea
        ref={contentRef}
        id="content"
        className="content"
        placeholder="No content"
        value={note.content}
        onInput={e => autoSize(e.target)}
        onFocus={e => autoSize(e.target)}
        onChange={e => setNote({ ...note, content: e.target.value })}
        onBlur={e => {
          onSaveNote(note);
        }}
      />
    </div>
  );
}

export { Note };
