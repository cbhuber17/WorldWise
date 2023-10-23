import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

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
            <li>👉 AWS Amplify</li>
            <li>👉 React & Vite</li>
            <li>👉 Pockethost.io</li>
            <li>👉 Leaflet</li>
            <li>👉 CKEditor</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
