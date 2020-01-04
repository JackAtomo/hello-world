import axios from "axios";
import { login, register } from "./authService";
import { getNotes } from "./notesService";

// Utility function para comprobar si la URL necesita un Bearer o no
function isBearerTokenRequired(url) {
  const parsedURL = new URL(url);
  if (["/auth", "/user"].includes(parsedURL.pathname)) {
    return false;
  }
  return true;
}

// Al iniciar este módulo recuperamos el usuario guardado del localStorage.
// La idea es la misma que en el auth-context.js. Si el usuario refresca la página
// mantengo el estado en el que estaba
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Iniciamos la variable token con lo almacenado en el localStorage
// Si no tenia nada la inicio a null
// La siguiente condicion de OR si la primera parte es true entonces se queda con el
// resultado de la primera condición y en caso contrario con la segunda (null)
let token = (currentUser && currentUser.token) || null;

// Definimos interceptors de request y response
// REQUEST
// -------
// En cada una de las peticiones se ejecutaran estas funciones
// Si la cadena de interceptors no falla entonces se irá ejecutando la
// primera función, si falla alguno de los interceptors entonces irá por la segunda.
axios.interceptors.request.use(
  function(config) {
    // Compruebo si tengo token y si necesito enviarlo en el
    // header de Authorization
    if (token && isBearerTokenRequired(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Acordarnos de devolver la config!!. Si no no sigue la cadena
    // y la petición no se hace
    return config;
  },
  function(error) {
    // Siempre devolver el error de esta forma, a través de Promise.reject
    return Promise.reject(error);
  }
);

// RESPONSE
// --------
// Cada vez que llegue una respuesta entonces se ejecutarán los interceptors
// La primera función si la respuesta es correcta
// La segunda si la respuesta trae un status >=400 o bien si tengo mas interceptors
// y alguno produce un error
axios.interceptors.response.use(
  function(response) {
    // Si la respuesta trae un token entonces lo almaceno
    // Mi aplicación supone que mi backend envia un objeto con { token, user } siempre
    // que el usuario se identifica (Login, Registro)
    // En otra aplicación podría ser diferente
    if (response.data.token) {
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      token = response.data.token;
    }
    return response;
  },
  function(error) {
    // En caso de que el token expire (401)
    // y no sea el endpoint de login (que tambien devuelve 401 cuando las credenciales son invalidas)
    // Entonces redirijo a la URL de login y limpio el localStorage
    if (
      error.response.status === 401 &&
      error.config.url.indexOf("/auth") === -1
    ) {
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }
    // Siempre devolver el error de esta forma, a través de Promise.reject
    return Promise.reject(error);
  }
);

export { login, register, getNotes };
