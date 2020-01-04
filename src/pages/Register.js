import React from "react";
import { Link } from "react-router-dom";
import useForm from "react-hook-form";
import { useAuth } from "../shared/context/auth-context";
import { REGISTER_VALIDATIONS } from "../shared/validations";
import { Header } from "../components/Header";

function Register() {
  const { signUp } = useAuth();
  const { register, errors, formState, handleSubmit, setError } = useForm({
    mode: "onBlur" // Lanza validaciones cada vez que hago blur
  });

  const getColor = name => {
    return errors[name] ? "ko" : formState.touched.includes(name) && "ok";
  };

  const handleSignUp = formData => {
    return signUp(formData).catch(error => {
      if (error.response.status === 409) {
        setError(
          "email",
          "conflict",
          "The email already exists. Please try again"
        );
      }
    });
  };

  // Utilizar la funcion creada en el auth-context
  return (
    <React.Fragment>
      <Header title="Notes App" />
      <main className="centered-container">
        <h3>Please Register</h3>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className={`form-control ${getColor("name")}`}>
            <label>Name</label>
            <input
              ref={register(REGISTER_VALIDATIONS.name)}
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            <span className="errorMessage">
              {errors.name && errors.name.message}
            </span>
          </div>
          <div className={`form-control ${getColor("email")}`}>
            <label>Email</label>
            <input
              ref={register(REGISTER_VALIDATIONS.email)}
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email"
            />
            <span className="errorMessage">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className={`form-control ${getColor("password")}`}>
            <label>Password</label>
            <input
              ref={register(REGISTER_VALIDATIONS.password)}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <span className="errorMessage">
              {errors.password && errors.password.message}
            </span>
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              Submit
            </button>
            <div className="m-t-lg">
              <Link to="/login">Already have an account. Please Login</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}

export { Register };
