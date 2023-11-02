import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

/* eslint react/prop-types: 0 */
function Provider({ name, href }) {
  const style = {
    textDecoration: "inherit",
    color: "inherit",
  };

  return (
    <a href={href} rel="noopener noreferrer" target="_blank" style={style}>
      <li>{name}</li>
    </a>
  );
}

const providers = [
  { name: "👉 AWS Amplify", href: "https://aws.amazon.com/amplify" },
  { name: "👉 React 18", href: "https://react.dev/" },
  { name: "👉 Vite", href: "https://vitejs.dev/" },
  { name: "👉 Pockethost.io", href: "https://pockethost.io/" },
  { name: "👉 Leaflet", href: "https://leafletjs.com/" },
  { name: "👉 CKEditor", href: "https://ckeditor.com/" },
];

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          // src="/assets/img/img-1.jpg"
          src="/WorldWise/assets/img/img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About GeoNotes.</h2>
          <p>GeoNotes is powered by:</p>
          <ul style={{ fontSize: "15px", listStyleType: "none" }}>
            {providers.map((provider, index) => (
              <Provider key={index} {...provider} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
