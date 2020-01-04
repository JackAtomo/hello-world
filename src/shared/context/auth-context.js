import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { login, register } from '../../http';

// 1) Creamos el contexto
const AuthContext = React.createContext();

// Recuperamos el token del localStorage ya que si el usuario
// refresca la página del navegador necesito iniciar la aplicación
// con un estado autenticado
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// 2) Creamos el custom Provider
export function AuthProvider({ children }) {
  // 2.1) Creamos Estados
  // En caso de que trabaje con roles deberia decodificar el token para obtener el role inicial
  // const [role, setRole] = useState(decodeTokenAndGetRole(currentUser.token));
  const [isAuthenticated, setIsAuthenticated] = useState(currentUser !== null);
  const [user, setUser] = useState(currentUser && currentUser.user);

  const history = useHistory();

  // 2.2) Definiremos los métodos para modificar el estado
  // Login => Cambiaré a true mi estado
  // Si trabajo con roles puedo establecer el role a través de la decodificación del token
  const signIn = async ({ email, password }) => {
    try {
      const {
        data: { token, user }
      } = await login(email, password);
      setUser(user);
      setIsAuthenticated(true);
      // Si uso roles => decodificar el token para sacar el role
      // setRole(role);
      if (token) {
        history.push('/');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Register => Cambiaré a true mi estado
  const signUp = async ({ name, email, password }) => {
    try {
      const {
        data: { token, user }
      } = await register({ name, email, password });
      setUser(user);
      setIsAuthenticated(true);
      if (token) {
        history.push('/');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Logout => Cambiaré a false mi estado
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  // 2.3) Devolvemos el Context
  // Si usara roles puedo devolver el role actual del usuario en lugar de isAuthenticated
  // return (
  //   <AuthContext.Provider
  //     value={{ role, setRole, signIn, user }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signIn,
        user,
        signUp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 3) Crear el custom hook
// Es lo que usaré en los componentes para acceder al value del contexto
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
