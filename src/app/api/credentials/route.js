import { createCredentials, getCredentials } from "./controller";


export async function GET() {
  return await getCredentials();
  
}

export async function POST(req) {
  return await createCredentials(req);
 
}