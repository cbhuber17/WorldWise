import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();

  const { attributes } = user;
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  // TODO: avatar from amplify bucket
  return (
    <div className={styles.user}>
      <img
        src={attributes.avatar || "/assets/img/no-profile.png"}
        alt={attributes.name}
      />
      <span>Welcome, {attributes.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
