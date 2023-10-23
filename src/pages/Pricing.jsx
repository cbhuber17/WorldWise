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
            why our travel journal web app is free. We want to encourage people
            from all walks of life to document and cherish their journeys
            without any financial barriers.
          </p>
          <p>
            My mission is to inspire wanderlust and connect travelers through
            the joy of sharing their adventures. Keeping our travel journal web
            app free ensures that everyone can participate and share their
            unique travel stories.
          </p>
          <p>
            I am passionate about fostering a global community of explorers, and
            offering our app for free is our way of giving back to the travel
            community and helping travelers preserve their precious memories at
            no cost.
          </p>
        </div>
        <img
          // src="/assets/img/img-2.jpg"
          src="/WorldWise/assets/img/img-2.jpg"
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </main>
  );
}
