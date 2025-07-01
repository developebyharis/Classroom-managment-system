import { createBooking, deleteBooking, getBooking, updateBookingStatus } from "./controller";
import { corsOptionsResponse, withCorsHeaders } from "@/lib/utils";

export async function OPTIONS(request) {
  return corsOptionsResponse();
}

export async function POST(req) {
  const res = await createBooking(req);
  return withCorsHeaders(res);
}

export async function GET() {
  const res = await getBooking();
  return withCorsHeaders(res);
}

export async function PATCH(req) {
  const res = await updateBookingStatus(req);
  return withCorsHeaders(res);
}

export async function DELETE(req) {
  const res = await deleteBooking(req);
  return withCorsHeaders(res);
}