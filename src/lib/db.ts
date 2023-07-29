import { MongoClient } from "mongodb";
import { DATABASE_URL } from "$env/static/private";
const client = new MongoClient(DATABASE_URL);
await client.connect();
export default client.db(""); // select database
