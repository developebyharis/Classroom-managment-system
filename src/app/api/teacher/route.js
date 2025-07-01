import { createTeacher, deleteTeacher, getTeacher, updateTeacher } from "./controller";
import { corsOptionsResponse, withCorsHeaders } from "@/lib/utils";

export async function OPTIONS(request) {
  return corsOptionsResponse();
}

export async function POST(req) {
  const res = await createTeacher(req);
  return withCorsHeaders(res);
}

export async function GET() {
  const res = await getTeacher();
  return withCorsHeaders(res);
}

