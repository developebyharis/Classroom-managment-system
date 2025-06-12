import { getCredentials } from "@/server/controllers/credentialsController";



export async function GET(req) {
    return await getCredentials();
}