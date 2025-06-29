import { db } from "@/lib/connectDb";

export async function createBooking(req) {
  try {
    const body = await req.json();

    const {
      classroom_id,
      teacher_id,
      timeFrom,
      timeTo,
      semester,
      section,
      course,
    } = body;
    const semesterVal = Number(semester);

    await db.query(
      `INSERT INTO booking (classroom_id, teacher_id, time_from, time_to, semester, section,course, status) VALUES (?, ?, ?, ?, ?,?,?,?)`,
      [
        classroom_id,
        teacher_id,
        timeFrom,
        timeTo,
        semesterVal,
        section,
        course,
        "Booked",
      ]
    );
    const [rows] = await db.query(
      `SELECT id FROM booking WHERE classroom_id = (?)`,
      [classroom_id]
    );
    const booking_id = rows[0]?.id;

    await db.query(`UPDATE classroom SET booking_id = ? WHERE id = ?`, [
      booking_id,
      classroom_id,
    ]);

    return Response.json(
      { success: true, message: "Classroom Booked" },
      { status: 201 }
    );
  } catch (error) {
    console.error("createBooking failed:", error);

    return Response.json(
      {
        success: false,
        message: `Unexpected server error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function getBooking() {
  try {
    const [booking] = await db.query(`SELECT * from booking`);
    const [classroom] = await db.query(
      `SELECT * FROM classroom WHERE id IN (SELECT DISTINCT classroom_id FROM booking)`
    );
    const [teacher] = await db.query(
      `SELECT * FROM teacher WHERE id IN (SELECT DISTINCT teacher_id FROM booking)`
    );

    return new Response(
      JSON.stringify({ success: true, data: { booking, classroom, teacher } }),
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

export async function updateBookingStatus(req) {
  try {
    const { bookingId, status } = await req.json();

    await db.query(`UPDATE booking SET status = ? WHERE id = ?`, [
      status,
      bookingId,
    ]);

    if (status === "Cancelled") {
      await db.query(
        `UPDATE classroom SET booking_id = NULL WHERE booking_id = ?`,
        [bookingId]
      );
    }

    return Response.json(
      { success: true, message: "Booking status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("updateBookingStatus failed:", error);
    return Response.json(
      {
        success: false,
        message: `Unexpected server error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function deleteBooking(req) {
  try {
    const body = await req.json();
    const { id } = body;
console.log(body)
    await db.query('UPDATE classroom SET booking_id = NULL WHERE booking_id = ?', [id]);
await db.query('DELETE FROM booking WHERE id = ?', [id]);
    return Response.json(
      { success: true, message: "Delete booking successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("deleteBooking failed:", error);
    return Response.json(
      {
        success: false,
        message: `Unexpected server error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
