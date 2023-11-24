import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Storage } from "aws-amplify";
import { useAuth } from "../contexts/AuthContext";
import IconSettingsOutline from "./icons/IconSettingsOutline";
import styles from "./User.module.css";

function User() {
  const [avatar, setAvatar] = useState("");
  const { user, logout, isReadOnly } = useAuth();
  const navigate = useNavigate();

  let { attributes } = user;

  // Demo account only
  if (!attributes) {
    attributes = user.challengeParam.userAttributes;
  }

  useEffect(() => {
    async function getAvatar() {
      const result = await Storage.get(attributes.picture, {
        level: "private",
      });
      setAvatar(result);
    }
    if (attributes.picture !== "demo.jpg") getAvatar();
  }, [attributes.picture]);

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      {/* TODO: avatar will always return a string.  Make sure that string points to a valid aws image (not 404).  If the image is deleted, the short circuit will not work below */}
      <img
        src={avatar || "/assets/img/no-profile.png"}
        alt={attributes.name}
        title={attributes.name}
      />
      <span>Welcome, {attributes.name}</span>
      <button onClick={handleClick}>Logout</button>
      {isReadOnly ? null : (
        <Link
          to="/update-profile"
          title="Update profile"
          style={{ padding: "0 10px" }}
        >
          <IconSettingsOutline />
        </Link>
      )}
    </div>
  );
}

export default User;
