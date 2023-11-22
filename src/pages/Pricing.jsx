// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2 style={{ marginBottom: "0px" }}>Simple pricing. Free.</h2>
          <span style={{ fontSize: "10px", color: "grey" }}>
            (For friends & family of Colin Huber)
          </span>
          <br />
          <br />
          <p>
            I believe in making travel experiences accessible to all, which is
            why the travel journal web app is free. I want to encourage people
            from all walks of life to document and cherish their journeys
            without any financial barriers.
          </p>
        </div>
        <img
          // src="/assets/img/img-2.jpg"
          src="/WorldWise/assets/img/img-2.jpg"
          alt="overview of a large city with skyscrapers"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        />
      </section>
    </main>
  );
}
