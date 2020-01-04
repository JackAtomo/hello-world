import React from "react";
import { Link } from "react-router-dom";
import useForm from "react-hook-form";
import { useAuth } from "../shared/context/auth-context";
import { LOGIN_VALIDATIONS } from "../shared/validations";
import { Field } from "../components/Field";
import { Header } from "../components/Header";

function Login() {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState,
    errors,
    setError,
    setValue
  } = useForm({
    mode: "onBlur"
  });

  // console.log("WATCH: ", watch());
  // console.log("STATE: ", formState);
  // console.log("ERRORS:", errors);

  const handleSignin = formData => {
    return signIn(formData)
      .then(d => console.log(d))
      .catch(error => {
        setError(
          "password",
          "invalidCredentials",
          "The email or the password are invalid"
        );
        setValue("password", "");
      });
  };

  return (
    <React.Fragment>
      <Header title="Notes App" />
      <main className="centered-container">
        <h3>Please Login</h3>
        <form onSubmit={handleSubmit(handleSignin)}>
          <Field
            name="email"
            label="Email"
            type="text"
            validations={register(LOGIN_VALIDATIONS.email)}
            formState={formState}
            errors={errors}
            placeholder="Enter your email"
          />
          <Field
            name="password"
            label="Password"
            type="password"
            validations={register(LOGIN_VALIDATIONS.password)}
            formState={formState}
            errors={errors}
            placeholder="Enter your password"
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              disabled={formState.isSubmitting}
            >
              Submit
            </button>
            <div className="m-t-lg">
              <Link to="/register">Don't have an account. Please sign up</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}

export { Login };
