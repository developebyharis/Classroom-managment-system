import { db } from "@/lib/connectDb";

export async function getCredentials() {
    const [data] = await db.query("SELECT * FROM credentials");
  // console.log("Fetched credentials from DB:", data);
  return data;
}