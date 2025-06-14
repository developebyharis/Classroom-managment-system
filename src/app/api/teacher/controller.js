import { db } from "@/lib/connectDb";

export async function createTeacher(req) {
  try {
    const body = await req.json();
    console.log("Teacher", body);

    const {
      username,
      password,
      name,
      email,
      mobile,
      department,
      section,
      semester,
    } = body;

    await db.query(
      `INSERT INTO credentials (username, password, role) VALUES (?, ?, ?)`,
      [username, password, "Teacher"]
    );

    // Insert departments if not exist and get ID
    const depName = department[0]; // assuming single dept
    await db.query(
      `INSERT IGNORE INTO departments (department_name) VALUES (?)`,
      [depName]
    );
    const [depRows] = await db.query(
      `SELECT id FROM departments WHERE department_name = ?`,
      [depName]
    );
    const departmentId = depRows[0].id;

    // Join arrays as strings for now (if you're not using junction tables)
    const sectionString = section.join(",");
    const semesterString = semester.join(",");

    // Save teacher
    await db.query(
      `INSERT INTO teacher (name, email, phone, semester, section, department_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, mobile, semesterString, sectionString, departmentId]
    );

    return Response.json(
      { success: true, message: "Teacher created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server Error:", error.message);
    return Response.json(
      { success: false, message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function getTeacher() {
  try {
    const [teacher] = await db.query(`SELECT * FROM teacher`);
    const [dep] = await db.query(
      `SELECT * FROM departments WHERE id IN (SELECT DISTINCT department_id FROM teacher)`
    );

    return new Response(JSON.stringify({ success: true, teacher: {teacher, dep} }), {
      status: 200,
    });
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

export async function updateTeacher(req) {
  try {
    const body = req.json();
    await db.query(``);

    return new Response({ success: true }, { status: 200 });
  } catch (err) {
    return new Response({ message: err.message }, { status: 500 });
  }
}
export async function deleteTeacher(req) {
  try {
    const id = req.body;
    await db.query(``);

    return new Response({ success: true }, { status: 200 });
  } catch (err) {
    return new Response({ message: err.message }, { status: 500 });
  }
}