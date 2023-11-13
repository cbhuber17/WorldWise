import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import FormRow from "../components/FormRow";
import Spinner from "../components/Spinner";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    if (email && password) login(email, password);
    setTimeout(() => setLoading(false), 1500);
  }

  // After user is authenticated, move to app
  useEffect(
    function () {
      if (isAuthenticated)
        navigate("/app", {
          replace: true,
        }); // replace allows the user to go back to the page before the login page
    },
    [isAuthenticated, navigate]
  );

  const formRows = [
    {
      htmlFor: "email",
      text: "Email Address",
      type: "email",
      id: "email",
      handleFn: setEmail,
      value: email,
    },
    {
      htmlFor: "password",
      text: "Password",
      type: "password",
      id: "password",
      handleFn: setPassword,
      value: password,
    },
  ];

  return (
    <main className={styles.login}>
      <PageNav />
      <h1>Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {formRows.map((formRow) => (
          <FormRow key={formRow.id} {...formRow} />
        ))}

        <div>
          {loading ? <Spinner /> : <Button type="primary">Sign in</Button>}
        </div>
      </form>
    </main>
  );
}
