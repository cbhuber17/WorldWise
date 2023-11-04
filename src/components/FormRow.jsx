import styles from "./../components/FormRow";

/* eslint react/prop-types: 0 */
export default function FormRow({ htmlFor, text, type, id, handleFn, value }) {
  return (
    <div className={styles.row}>
      <label htmlFor={htmlFor}>{text}</label>
      <input
        style={{ color: "black" }}
        type={type}
        id={id}
        onChange={(e) => handleFn(e.target.value)}
        value={value}
      />
    </div>
  );
}
