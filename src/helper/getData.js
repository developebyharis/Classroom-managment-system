import { db } from "@/lib/connectDb";

export async function getCredentials() {
  const data = await db`SELECT * FROM credentials`;
  return data;
  console.log("Credentials fetched:", data);
}

export async function getData() {
  try {
    console.log("🔍 Fetching data from DB...");

    const classroom = await db`SELECT * FROM classroom`;
    const department = await db`SELECT * FROM department`;
    const teacher = await db`SELECT * FROM teacher`;
    const courses = await db`SELECT * FROM courses`;
    const booking = await db`SELECT * FROM booking`;
    const credentials = await db`SELECT * FROM credentials`;


    return {
      classroom,
      department,
      teacher,
      courses,
      booking: { data: { booking, classroom, teacher } },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      classroom: [],
      department: [],
      teacher: [],
      booking: { data: { booking: [], classroom: [], teacher: [] } },
    };
  }
}
