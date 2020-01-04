import React, { useEffect, useReducer } from 'react';
import { getNotes } from '../http';
import { Header } from '../components/Header';
import { useAuth } from '../shared/context/auth-context';
import { TagList } from '../components/TagList';
import { NoteList } from '../components/NoteList';
import { Note } from '../components/Note';
import { useMatchMedia } from '../shared/hooks/useMatchMedia';
import * as http from '../http/notesService';

// Notes Reducer
// -------------
// Definiremos acciones que controlaran nuestra interfaz
// El estado será el siguiente
// {
//   notes: [],
//   isFetching: false,
//   selectedTag: null,
//   selectedNote: null,
//   isMenuOpened: false,
//   isNoteOpened: false,
//   error: null
// }
function notesReducer(state, action) {
  switch (action.type) {
    case 'GET_NOTES_SUCCESS':
      return { ...state, notes: action.initialNotes };
    case 'SELECT_TAG':
      return { ...state, selectedTag: action.index };
    case 'SELECT_NOTE':
      return { ...state, selectedNote: action.index };
    case 'TOGGLE_MENU':
      return {
        ...state,
        isMenuOpened: !state.isMenuOpened,
        isNoteOpened: false
      };
    case 'TOGGLE_NOTE':
      return {
        ...state,
        isMenuOpened: false,
        isNoteOpened: !state.isNoteOpened
      };
    case 'CREATE_NOTE':
      return { ...state, notes: [action.note, ...state.notes] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => {
          if (note.id === action.note.id) {
            return action.note;
          }
          return note;
        })
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.id)
      };
    default:
      return state;
  }
}

function Dashboard() {
  const { user, logout } = useAuth();
  const isMobile = useMatchMedia('(max-width: 576px)');

  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
    selectedTag: null,
    selectedNote: null,
    isMenuOpened: false,
    isNoteOpened: false
  });

  useEffect(() => {
    getNotes().then(response =>
      dispatch({ type: 'GET_NOTES_SUCCESS', initialNotes: response.data.rows })
    );
  }, []);

  // Cada vez que se hace un render se calcula la lista de tags
  const tags = state.notes.reduce((acc, current) => {
    current.tags.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  // LOGICA
  // ------
  // - selectTag - Función para seleccionar un Tag a través del reducer (El index) - selectedTag
  const selectTag = selectedIndex =>
    dispatch({ type: 'SELECT_TAG', index: selectedIndex });

  // - selectNote - Función para seleccionar una nota a través del reducer (El index) - selectedNote
  const selectNote = selectedIndex =>
    dispatch({ type: 'SELECT_NOTE', index: selectedIndex });

  // - filteredNotes - Función para calcular las notas que se han de mostrar en función del
  //   tag seleccionado y del texto seleccionado. Hace el cálculo a partir de notes
  const filteredNotes = state.notes.filter(
    note =>
      state.selectedTag === null || note.tags.includes(tags[state.selectedTag])
  );

  // RESPONSIVE UI
  // -------------
  // - isMenuOpened y isNoteOpened
  // En base a sus estados true o false abrir o cerrar el menu cambiando las
  // clases menu-opened y notes-opened

  // COMUNICACION HTTP (https://docs.yagopv.now.sh)
  // -----------------
  // - createNote - Permite crear una nota. Un POST al servidor
  // - saveNote - Permite modificar una nota. Un  PUT al servidor
  // - deleteNote - Permite borrar una nota
  const createNote = async () => {
    const response = await http.createNote({
      title: '',
      content: '',
      tags: []
    });
    dispatch({ type: 'CREATE_NOTE', note: response.data });
    selectNote(0);
    selectTag(null);
    dispatch({ type: 'TOGGLE_NOTE' });
  };

  const updateNote = async note => {
    const response = await http.updateNote(note);
    dispatch({ type: 'UPDATE_NOTE', note: response.data });
  };

  const deleteNote = async id => {
    await http.deleteNote(id);
    dispatch({ type: 'DELETE_NOTE', id });
    selectNote(null);
    dispatch({ type: 'TOGGLE_NOTE' });
  };

  return (
    <React.Fragment>
      <Header
        title="My Notes"
        user={user}
        onToggleMenu={() => {
          dispatch({ type: 'TOGGLE_MENU' });
        }}
        onLogout={logout}
      />
      <main id="dashboard">
        {/* class menu-opened abre el menu */}
        {/* class notes-opened abre las notas */}
        <div
          className={`grid ${state.isMenuOpened &&
            'menu-opened'} ${state.isNoteOpened && 'notes-opened'}`}
        >
          {/* <TagList tags selectedIndex onSelectTag> - INICIO */}

          <TagList
            tags={tags}
            selectedIndex={state.selectedTag}
            onSelectTag={i => {
              selectTag(i);
              dispatch({ type: 'TOGGLE_MENU' });
            }}
          />

          {/* </TagList> - FIN */}

          <div class="note-list">
            {/* <Search onSearchTextChanged onAddNote> INICIO - Modifica el filtrado */}

            <div class="flex">
              <input class="search" type="search" />
              <button class="icon-button add-note" onClick={createNote} />
            </div>

            {/* </ Search> FIN */}

            {/* <NoteList notes selectedIndex onSelectNote> INICIO - Muestra la lista de notas */}

            <NoteList
              notes={filteredNotes}
              selectedIndex={state.selectedNote}
              onNoteSelected={i => {
                selectNote(i);
                dispatch({ type: 'TOGGLE_NOTE' });
              }}
            />

            {/* </ NoteList> FIN */}
          </div>

          {/* <NoContent text> INICIO - Mostrar si no hay nota seleccionada */}
          {/* <h3 class="no-note-selected">
            Select a note to start previewing and editing
          </h3> */}
          {/* </ NoContent> FIN */}

          {/* <Note initialNote onSaveNote onDeleteNote> INICIO - Mostrar cuando hay una nota seleccionada */}

          {state.selectedNote !== null && (
            <Note
              defaultNote={filteredNotes[state.selectedNote]}
              onSaveNote={note => updateNote(note)}
              onDeleteNote={id => deleteNote(id)}
            />
          )}

          {/* </Note> FIN */}
        </div>

        {/* Back button */}

        {isMobile && state.isNoteOpened && (
          <button
            className="icon-button add-note-mobile"
            style={{ position: 'fixed', bottom: '20px', left: '20px' }}
            onClick={() => dispatch({ type: 'TOGGLE_NOTE' })}
          />
        )}

        {/* Back button end */}

        {/* Show / Hide loader si alguna peticion en curso*/}

        {/* <div className="loader">
          <Loader />
        </div> */}

        {/*  */}
      </main>
    </React.Fragment>
  );
}

export { Dashboard };
