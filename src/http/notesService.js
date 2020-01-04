import axios from "axios";

export function getNotes() {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/notes`);
}

export function updateNote(note) {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/notes/${note.id}`,
    note
  );
}

export function createNote(note) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/notes`, note);
}

export function deleteNote(noteId) {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/notes/${noteId}`);
}
