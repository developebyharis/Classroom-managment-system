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
      course,
      course_code,
      semester,
    } = body;

    await db.query(
      `INSERT IGNORE INTO credentials (username, password, role)
       VALUES (?, ?, ?)`,
      [username, password, "Teacher"]
    );
    const [[{ id: credentialsId }]] = await db.query(
      `SELECT id FROM credentials WHERE username = ? AND password = ? AND role = ?`,
      [username, password, "Teacher"]
    );

    const depName = department[0];
    await db.query(
      `INSERT IGNORE INTO departments (department_name) VALUES (?)`,
      [depName]
    );
    const [[{ id: departmentId }]] = await db.query(
      `SELECT id FROM departments WHERE department_name = ?`,
      [depName]
    );

    await db.query(
      `INSERT IGNORE INTO courses (course_name, course_code)
       VALUES (?, ?)`,
      [course, course_code]
    );
    const [[{ id: courseId }]] = await db.query(
      `SELECT id FROM courses WHERE course_name = ? AND course_code = ?`,
      [course, course_code]
    );
    

    const semesterString = semester.join(",");
    const sectionString  = section.join(",");

    await db.query(
      `INSERT INTO teacher
       (name, email, phone, semester, section, course_id, department_id, credentials_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,         
      [
        name,
        email,
        mobile,
        semesterString,
        sectionString, 
        courseId || null,
        departmentId,
        credentialsId
      ]
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
     const [course] = await db.query(
      `SELECT * FROM courses WHERE id IN (SELECT DISTINCT course_id FROM teacher)`
    );

    return new Response(
      JSON.stringify({ success: true, teacher: { teacher, dep, course } }),
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
