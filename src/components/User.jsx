import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Storage } from "aws-amplify";
import { useAuth } from "../contexts/AuthContext";
import IconSettingsOutline from "./icons/IconSettingsOutline";
import styles from "./User.module.css";

function User() {
  const [avatar, setAvatar] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { attributes } = user;

  useEffect(() => {
    async function getAvatar() {
      const result = await Storage.get(attributes.picture, {
        level: "private",
      });
      setAvatar(result);
    }
    getAvatar();
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
      <Link to="/update-profile" title="Update profile">
        <IconSettingsOutline />
      </Link>
    </div>
  );
}

export default User;
