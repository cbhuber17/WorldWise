import styles from "./Message.module.css";

/* eslint react/prop-types: 0 */
function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
