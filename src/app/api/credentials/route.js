import { createCredentials, getCredentials } from "./controller";
import { corsOptionsResponse, withCorsHeaders } from "@/lib/utils";

export async function OPTIONS(request) {
  return corsOptionsResponse();
}

export async function GET() {
  return await getCredentials();
  
}

export async function POST(req) {
  return await createCredentials(req);
 
}