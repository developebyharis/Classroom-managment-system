import { neon } from "@neondatabase/serverless";


export const db = neon(process.env.DATABASE_URL);

// Test the connection
db`SELECT 1`
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });
