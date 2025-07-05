import { deleteClassroom, getClassroom, updateClassroom } from "../controller"
import { corsOptionsResponse, withCorsHeaders } from "@/lib/utils";

export async function OPTIONS(request) {
  return corsOptionsResponse();
}

export async function UPDATE(req) {
  const res = await updateClassroom(req);
  return withCorsHeaders(res);
}

export async function DELETE(req) {
  const res = await deleteClassroom();
  return withCorsHeaders(res);
}

export async function GET(req) {
  const res = await getClassroom(req);
  return withCorsHeaders(res);
}