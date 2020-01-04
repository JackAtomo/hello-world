import axios from "axios";

export function login(email, password) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth`, null, {
    auth: {
      username: email,
      password
    }
  });
}

export function register({ name, email, password }) {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
    name,
    email,
    password
  });
}
