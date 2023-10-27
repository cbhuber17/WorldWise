import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import toast, { Toaster } from "react-hot-toast";
import PageNav from "../components/PageNav";
import FormRow from "../components/FormRow";
import Button from "../components/Button";
import styles from "./Login.module.css";

const toastStyle = { fontSize: "20px" };

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function checkField(field, errorMsg) {
  if (!field) {
    toast.error(`${errorMsg} cannot be empty`, { style: toastStyle });
    return false;
  }
  return true;
}

function validateEmailPassword(email, password, passwordConfirm) {
  if (!checkField(email, "Email")) return false;
  if (!checkField(password, "Password")) return false;
  if (!checkField(passwordConfirm, "Password confirmation")) return false;

  if (!validateEmail(email)) {
    toast.error("Invalid email.", { style: toastStyle });
    return false;
  }

  if (password !== passwordConfirm) {
    toast.error("Passwords to not match", { style: toastStyle });
    return false;
  }

  return true;
}

function validateName(firstName, lastName) {
  if (!checkField(firstName, "First name cannot be empty")) return false;
  if (!checkField(lastName, "Last name cannot be empty")) return false;

  return true;
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(
    e,
    email,
    firstName,
    lastName,
    password,
    passwordConfirm,
    avatar,
    setPassword,
    setPasswordConfirm
  ) {
    e.preventDefault();

    // Guard clauses
    if (!validateEmailPassword(email, password, passwordConfirm)) return;
    if (!validateName(firstName, lastName)) return;

    // TODO: Check if allowed in list of DBs, i.e. whitelisted friends and family

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name: firstName,
          family_name: lastName,
          picture: avatar,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });

      navigate("/confirm", { state: { email } });
    } catch (error) {
      // TODO: Check previously signed up, happens in this catch
      setPassword("");
      setPasswordConfirm("");
      toast.error(error);
      console.error("Error signing up:", error);
    }
  }

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
      htmlFor: "first",
      text: "First Name",
      type: "text",
      id: "first",
      handleFn: setFirstName,
      value: firstName,
    },
    {
      htmlFor: "last",
      text: "Last Name",
      type: "text",
      id: "last",
      handleFn: setLastName,
      value: lastName,
    },
    {
      htmlFor: "password",
      text: "Password",
      type: "password",
      id: "password",
      handleFn: setPassword,
      value: password,
    },
    {
      htmlFor: "passwordConfirm",
      text: "Password Confirm",
      type: "password",
      id: "passwordConfirm",
      handleFn: setPasswordConfirm,
      value: passwordConfirm,
    },
    {
      htmlFor: "avatar",
      text: "Avatar",
      type: "file",
      id: "avatar",
      accept: "image/*",
      handleFn: setAvatar,
      value: avatar,
    },
  ];

  return (
    // Change style
    <main className={styles.login}>
      <PageNav />
      <h1>Sign up for GeoNotes!</h1>
      <form
        className={styles.form}
        onSubmit={(e) =>
          handleSubmit(
            e,
            email,
            firstName,
            lastName,
            password,
            passwordConfirm,
            avatar,
            setPassword,
            setPasswordConfirm
          )
        }
      >
        {/* TODO: */}
        {/* accept="image/*" for avatar */}
        {formRows.map((formRow) => (
          <FormRow key={formRow.id} {...formRow} />
        ))}

        <div>
          <Button type="primary">Sign Up</Button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </main>
  );
}

// Amplify code confirmation email:
{
  /* <div style="background-color:#3a3f44; text-align: center; font-family: 'Courier New'; height: 100vh">
    <h1 style="color:#a89753"> Your GeoNotes Code: </h1>
    <div style="color:white; font-family:'Arial'; font-size:32px; width: 60%; background-color:grey; text-align: center; margin: auto">
{####}
    </div>
    <p style="color:yellow">Note: This code expires in 1 hour.</p>
    <hr style="width:90%">
    <p style="color:white; font-size: 12px">Didn't request a code?  You can ingnore this email.</p>
    <hr style="width:90%">
</div> */
}
