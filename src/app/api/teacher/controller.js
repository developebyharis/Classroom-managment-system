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

    // Insert credentials if not exists
    await db`
      INSERT INTO credentials (username, password, role)
      VALUES (${username}, ${password}, 'Teacher')
      ON CONFLICT (username) DO NOTHING
    `;

    const credentials = await db`
      SELECT id FROM credentials WHERE username = ${username} AND password = ${password} AND role = 'Teacher'
    `;
    const credentialsId = credentials[0]?.id;

    const depName = department[0];
    await db`
      INSERT INTO department (department_name)
      VALUES (${depName})
      ON CONFLICT (department_name) DO NOTHING
    `;
    const departments = await db`
      SELECT id FROM department WHERE department_name = ${depName}
    `;
    const departmentId = departments[0]?.id;

    await db`
      INSERT INTO courses (course_name, course_code)
      VALUES (${course}, ${course_code})
      ON CONFLICT (course_code) DO NOTHING
    `;
    const courses = await db`
      SELECT id FROM courses WHERE course_name = ${course} AND course_code = ${course_code}
    `;
    const courseId = courses[0]?.id;

    const semesterString = semester.join(",");
    const sectionString = section.join(",");

    await db`
      INSERT INTO teacher
      (name, email, phone, semester, section, course_id, department_id, credentials_id)
      VALUES (
        ${name},
        ${email},
        ${mobile},
        ${semesterString},
        ${sectionString},
        ${courseId || null},
        ${departmentId},
        ${credentialsId}
      )
    `;

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
    const teacher = await db`SELECT * FROM teacher`;
    const dep = await db`
      SELECT * FROM department WHERE id IN (SELECT DISTINCT department_id FROM teacher)
    `;
    const course = await db`
      SELECT * FROM courses WHERE id IN (SELECT DISTINCT course_id FROM teacher)
    `;

    return new Response(
      JSON.stringify({ success: true, teacher: { teacher, dep, course } }),
      { status: 200 }
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

export async function deleteTeacher(req) {
  try {
    const { id } = await req.json();
    await db`DELETE FROM teacher WHERE id = ${id}`;
    return Response.json(
      { success: true, message: "Teacher deleted" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// You can similarly refactor updateTeacher and deleteTeacher for Neon as needed.
