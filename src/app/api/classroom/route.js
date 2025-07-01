import { createClassroom, deleteClassroom, getClassroom, updateClassroom } from "./controller";
import { corsOptionsResponse, withCorsHeaders } from "@/lib/utils";

export async function OPTIONS(request) {
  return corsOptionsResponse();
}

export async function POST(req) {
  const res = await createClassroom(req);
  return withCorsHeaders(res);
}

export async function GET() {
  const res = await getClassroom();
  return withCorsHeaders(res);
}


