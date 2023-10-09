import PocketBase from "pocketbase";
import fs from "fs";

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
}

const db = new PocketBase(process.env.VITE_POCKETHOST_DB_URL);
const db_collection = "cities_cbhuber";

const data = await db.collection(db_collection).getFullList({
  sort: "-date",
  requestKey: "getCities",
});

const csv = convertToCSV(data);

fs.writeFile(`./${db_collection}_db.csv`, csv, (err) => {
  if (err) {
    console.error(err);
  }
});
