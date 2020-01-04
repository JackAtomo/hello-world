import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../shared/context/auth-context";

// PrivateRoute hace las funciones de Route pero además añade logica de 
// verificación de permisos de acceso a las rutas
function PrivateRoute({ children, /* allowedRoles */ ...others }) {
  // Extraigo del contexto (auth-context) si el usuario esta autenticado
  const { isAuthenticated } = useAuth();

  // Si tuviese roles extraería el role
  // const { role } = useAuth();


  // Si tiene permiso para acceder a la ruta devuelvo la ruta
  // En otro caso redirijo
  return (
    <Route {...others}>
      {isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  );

  // Si gestionase roles podria hacerlo asi
  // return (
  //   <Route {...others}>
  //     {allowedRoles.includes(role) ? children : <Redirect to="/login" />}
  //   </Route>
  // );
}

export { PrivateRoute };
