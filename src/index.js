import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Debido a un bug en codesandbox hay que importar todo aqui
import "./css/index.css";
import "./css/theme.css";
import "./css/buttons.css";
import "./css/forms.css";
import "./css/utils.css";
import "./css/components/header.css";
import "./css/components/tag-list.css";
import "./css/components/note.css";
import "./css/components/dashboard.css";
import "./css/components/note-list.css";
import "./css/components/dialog.css";
import "./css/components/tags-input.css";

import { Dashboard, Login, Register, NotFound } from "./pages";
import { AuthProvider } from "./shared/context/auth-context";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  // Routing
  // ---------------------------
  // 1) / => <Dashboard />
  // 2) /login => <Login />
  // 3) /register => <Register />
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          {/* Si gestionase roles podría pasar un array e roles */}
          {/* <PrivateRoute exact path="/" allowedRoles=['admin', 'user']> */}
          <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
