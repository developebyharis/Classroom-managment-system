import { db } from "@/lib/connectDb";

export async function createClassroom(req) {
  try {
    const body = await req.json();
    const { classroomName, department } = body;
    await db.query(
      "INSERT IGNORE INTO departments (department_name) VALUES (?)",
      [department]
    );

    const [rows] = await db.query(
      "SELECT id FROM departments WHERE department_name = ?",
      [department]
    );
    const departmentId = rows[0].id;

    await db.query(
      "INSERT INTO classroom (name, department_id) VALUES (?, ?)",
      [classroomName, departmentId]
    );

    return Response.json(
      { success: true, message: "Classroom added" },
      { status: 201 }
    );
  } catch (error) {
    console.error("createClassroom failed:", error);

    return Response.json(
      {
        success: false,
        message: `Unexpected server error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function getClassroom() {
  try {
    const [classroom] = await db.query(`SELECT * from classroom`);
    const [department] = await db.query(
      `SELECT * FROM departments`
    );

    return new Response(
      JSON.stringify({ success: true, data: { classroom, department } }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function updateClassroom(req) {
  try {
    const body = req.json();
    await db.query(``);

    return new Response({ success: true }, { status: 200 });
  } catch (err) {
    return new Response({ message: err.message }, { status: 500 });
  }
}

export async function deleteClassroom(req) {
  try {
    const id = req.body;
    await db.query(``);

    return new Response({ success: true }, { status: 200 });
  } catch (err) {
    return new Response({ message: err.message }, { status: 500 });
  }
}

export async function getClassroomById(req) {
   try {
    const [classroom] = await db.query(`SELECT * from classroom`);
    const [department] = await db.query(
      `SELECT * FROM departments`
    );

    return new Response(
      JSON.stringify({ success: true, data: { classroom, department } }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}