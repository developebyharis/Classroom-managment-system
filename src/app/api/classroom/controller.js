import { db } from "@/lib/connectDb";

// Create a classroom
export async function createClassroom(req) {
  try {
    const body = await req.json();
    const { classroomName, department } = body;

    // Insert department if not exists
    await db`INSERT INTO department (department_name) VALUES (${department}) ON CONFLICT (department_name) DO NOTHING`;

    // Get department id
    const departments = await db`SELECT id FROM department WHERE department_name = ${department}`;
    const departmentId = departments[0]?.id;
    if (!departmentId) {
      return Response.json(
        { success: false, message: "Department not found" },
        { status: 400 }
      );
    }

    // Insert classroom
    await db`INSERT INTO classroom (name, department_id) VALUES (${classroomName}, ${departmentId})`;

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

// Get all classrooms and departments
export async function getClassroom() {
  try {
    const classroom = await db`SELECT * FROM classroom`;
    const department = await db`SELECT * FROM department`;

    return new Response(
      JSON.stringify({ success: true, data: { classroom, department } }),
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

// Update classroom
export async function updateClassroom(req) {
  try {
    const body = await req.json();
    const { id, classroomName, departmentId } = body;

    await db`UPDATE classroom SET name = ${classroomName}, department_id = ${departmentId} WHERE id = ${id}`;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

// Delete classroom
export async function deleteClassroom(req) {
  try {
    const body = await req.json();
    const { id } = body;

    await db`DELETE FROM classroom WHERE id = ${id}`;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

// Get classroom by ID
export async function getClassroomById(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const classroom = await db`SELECT * FROM classroom WHERE id = ${id}`;
    const department = await db`SELECT * FROM departments`;

    return new Response(
      JSON.stringify({ success: true, data: { classroom, department } }),
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