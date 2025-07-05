import { createCredentials, getCredentials } from "./controller";
import { corsOptionsResponse, withCorsHeaders } from "@/lib/utils";

export async function OPTIONS(request) {
  return corsOptionsResponse();
}

export async function GET() {
  const res = await getCredentials();
  return withCorsHeaders(res);
}

export async function POST(req) {
  const res = await createCredentials(req);
  return withCorsHeaders(res);
}