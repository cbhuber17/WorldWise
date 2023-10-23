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
          // height={500}
        />
        <div>
          <h2>About GeoNotes.</h2>
          <p>
            GeoNotes is powered by:
            <ul style={{ listStyleType: "none" }}>
              <li>👉 AWS Amplify</li>
              <li>👉 React & Vite</li>
              <li>👉 Pockethost.io</li>
              <li>👉 Leaflet</li>
              <li>👉 CKEditor</li>
            </ul>
          </p>
        </div>
      </section>
    </main>
  );
}
