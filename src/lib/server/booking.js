

export async function deleteBooking(id) {
    try {
        await db`
        UPDATE classroom SET booking_id = NULL WHERE booking_id = ${id}
      `;
        await db`
        DELETE FROM booking WHERE id = ${id}
      `;
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
