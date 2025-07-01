import { db } from "@/lib/connectDb";

export async function getCredentials() {
  const [data] = await db.query("SELECT * FROM credentials");
  return data;
}

export async function getData() {
  try {
    console.log("🔍 Fetching data from DB...");

    const [classroom] = await db.query(`SELECT * FROM classroom`);
    const [department] = await db.query(`SELECT * FROM departments`);
    const [teacher] = await db.query(`SELECT * FROM teacher`);
    const [booking] = await db.query(`SELECT * FROM booking`);
    console.log("🔍 completed", classroom, department, teacher);

    return {
      classroom,
      department,
      teacher,
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
