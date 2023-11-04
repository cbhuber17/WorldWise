import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import FormRow from "../components/FormRow";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import parse from "html-react-parser";
import { sleep } from "../utils/utils";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

const toastStyle = { fontSize: "20px" };

function checkField(field, errorMsg) {
  if (!field) {
    toast.error(`${errorMsg} cannot be empty`, { style: toastStyle });
    return false;
  }
  return true;
}

function validatePassword(password, passwordConfirm) {
  if (!checkField(password, "Password")) return false;
  if (!checkField(passwordConfirm, "Password confirmation")) return false;

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
const user = await Auth.currentAuthenticatedUser();

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { attributes } = user;

  // TODO: use AWS as auth provider?  Applies to elsewhere in the code lib.
  const { isAuthenticated } = useAuth();

  // Not authenticated, just put back to home page
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState(`${attributes.name}`);
  const [lastName, setLastName] = useState(`${attributes.family_name}`);
  // const [avatar, setAvatar] = useState("");

  async function handleSubmit(
    e,
    firstName,
    lastName,
    password,
    passwordConfirm,
    // avatar,
    setPassword,
    setPasswordConfirm
  ) {
    e.preventDefault();

    // Guard clauses
    if (!validatePassword(password, passwordConfirm)) return;
    if (!validateName(firstName, lastName)) return;

    // TODO: Check if allowed in list of DBs, i.e. whitelisted friends and family

    try {
      // TODO: Check for blank entries
      await Auth.updateUserAttributes(user, {
        name: firstName,
        family_name: lastName,
        password,
        // TODO: remove blank
        picture: "",
      });

      // TODO: button state change when submitting
      // const update = await Storage.put(avatar.name, avatar, {
      //   level: "private",
      //   contentType: "image/*",
      //   completeCallback: (event) => {
      //     console.log(`Successfully uploaded ${event.key}`);
      //   },
      //   errorCallback: (err) => {
      //     console.error("Unexpected error while uploading", err);
      //   },
      // });

      // console.log(update);

      toast.success("Successfully updated profile!", { style: toastStyle });
      await sleep(2500);

      navigate("/app/cities");
    } catch (error) {
      // TODO: Check previously signed up, happens in this catch as certain exception type UsernameExistsException:
      // TODO: Check password requirements:
      // TODO: InvalidAccessKeyId: The AWS Access Key Id you provided does not exist in our records.
      // InvalidPasswordException: Password did not conform with policy: Password not long enough
      setPassword("");
      setPasswordConfirm("");
      toast.error(error);
      console.log("Error signing up:", error);
      await sleep(2500);
    }
  }

  const formRows = [
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
      text: parse(
        "Update Password <br/><span style='font-size:11px; color:silver'>Min 8 characters, containing at least: 1 uppercase, 1 lowercase, 1 numeric</span>"
      ),
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
  ];

  return (
    // Change style
    <main className={styles.login}>
      <PageNav />
      <h1>{`Update your profile for: ${attributes.email}`}</h1>
      <form
        className={styles.form}
        onSubmit={(e) =>
          handleSubmit(
            e,
            firstName,
            lastName,
            password,
            passwordConfirm,
            // avatar,
            setPassword,
            setPasswordConfirm
          )
        }
      >
        {formRows.map((formRow) => (
          <FormRow key={formRow.id} {...formRow} />
        ))}

        {/* Avatar form row input */}
        {/* <div className={styles.row}>
    <label htmlFor="avatar">
      Avatar <br />
      <span style={{ fontSize: "11px", color: "silver" }}>Optional</span>
    </label>
    <input
      style={{ color: "black" }}
      type="file"
      id="avatar"
      accept="image"
      required={false}
      onChange={(e) => handleFile(e)}
    />
  </div> */}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary">Update Profile</Button>
          <Link to="/app/cities">
            <Button type="primary">Cancel</Button>
          </Link>
        </div>
      </form>
      <Toaster position="bottom-center" />
      <h2>Want to delete your account? Contact your app administrator.</h2>
    </main>
  );
}
