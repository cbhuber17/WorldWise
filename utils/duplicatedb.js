import PocketBase from "pocketbase";

const db = new PocketBase(process.env.VITE_POCKETHOST_DB_URL);
const db_collection = "cities_cbhuber";

const data = await db.collection(db_collection).getFullList({
  sort: "-date",
  requestKey: "getCities",
});

const collection = data.reverse();

for (let i = 0; i < collection.length; i++) {
  let record = await db.collection("cities_demo").create(collection[i]);
  console.log(i, record);
  await new Promise((r) => setTimeout(r, 1000));
}
