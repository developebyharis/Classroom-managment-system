import { createBooking, deleteBooking, getBooking, updateBookingStatus } from "./controller";


export async function POST(req) {
  return await createBooking(req);
 
}

export async function GET() {
  return await getBooking();
 
}

export async function PATCH(req) {
  return await updateBookingStatus(req);
 
}

export async function DELETE(req) {
  return await deleteBooking(req);
 
}