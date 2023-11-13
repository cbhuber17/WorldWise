import styles from "./../pages/Login.module.css";

/* eslint react/prop-types: 0 */
const AvatarFormRow = ({ handleFile }) => {
  return (
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
  );
};

export default AvatarFormRow;
