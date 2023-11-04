import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import toast, { Toaster } from "react-hot-toast";
import FormRow from "../components/FormRow";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import styles from "./Login.module.css";
import { sleep } from "../utils/utils";

/* eslint react/prop-types: 0 */
export default function Confirm() {
  const [code, setCode] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state.email;

  const row = {
    htmlFor: "code",
    text: "Enter Code:",
    type: "text",
    id: "code",
    handleFn: setCode,
    value: code,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const confirm = await Auth.confirmSignUp(email, code);
      console.log(confirm);
      // TODO: button state change when submitting
      toast.success("Confirmation successful!", {
        style: { fontSize: "20px" },
      });
      await sleep(2500);
      navigate("/login");
    } catch (error) {
      toast.error(error, { style: { fontSize: "20px" } });
      console.log("Error confirming sign up", error);
      await sleep(2500);
    }
    setCode("");
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <h1>{`Confirmation email sent to ${email}.`}</h1>
      {/* Future TODO: Send code email again. */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormRow {...row} />
        <div>
          <Button type="primary">Confirm</Button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </main>
  );
}
