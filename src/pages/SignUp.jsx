import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, Storage } from "aws-amplify";
import toast, { Toaster } from "react-hot-toast";
import { sleep } from "../utils/utils";
import PageNav from "../components/PageNav";
import FormRow from "../components/FormRow";
import Button from "../components/Button";
import styles from "./Login.module.css";
import parse from "html-react-parser";

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

/* eslint react/prop-types: 0 */
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
          picture: avatar.name,
        },
      });

      // TODO: button state change when submitting
      await Storage.put(avatar.name, avatar, {
        level: "private",
        contentType: "image/*",
        completeCallback: (event) => {
          console.log(`Successfully uploaded ${event.key}`);
        },
        errorCallback: (err) => {
          console.error("Unexpected error while uploading", err);
        },
      });

      toast.success("Successfully signed up!", { style: toastStyle });
      await sleep(2500);

      navigate("/confirm", { state: { email } });
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

  async function handleFile(e) {
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
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
      text: parse(
        "Password <br/><span style='font-size:11px; color:silver'>Min 8 characters, containing at least: 1 uppercase, 1 lowercase, 1 numeric</span>"
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
        {formRows.map((formRow) => (
          <FormRow key={formRow.id} {...formRow} />
        ))}

        {/* Avatar form row input */}
        <div className={styles.row}>
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
        </div>

        <div>
          <Button type="primary">Sign Up</Button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </main>
  );
}

// Amplify code confirmation email:
/* <div style="background-color:#3a3f44; text-align: center; font-family: 'Courier New'; height: 100vh">
    <h1 style="color:#a89753"> Your GeoNotes Code: </h1>
    <div style="color:white; font-family:'Arial'; font-size:32px; width: 60%; background-color:grey; text-align: center; margin: auto">
{####}
    </div>
    <p style="color:yellow">Note: This code expires in 1 hour.</p>
    <hr style="width:90%">
    <p style="color:white; font-size: 12px">Didn't request a code?  You can ignore this email.</p>
    <hr style="width:90%">
</div> */

// Amplify S3 buckets policy
// {
//   "Version": "2012-10-17",
//   "Statement": [
//       {
//           "Sid": "AvatarAccess",
//           "Effect": "Allow",
//           "Principal": "*",
//           "Action": [
//               "s3:GetObject",
//               "s3:GetObjectAcl",
//               "s3:PutObject",
//               "s3:PutObjectAcl",
//               "s3:ListBucket",
//               "s3:DeleteObject"
//           ],
//           "Resource": [
//               "arn:aws:s3:::geonotes1aed35f17cbd4e51ac5b5ffceb95023d175918-dev",
//               "arn:aws:s3:::geonotes1aed35f17cbd4e51ac5b5ffceb95023d175918-dev/*"
//           ]
//       }
//   ]
// }
