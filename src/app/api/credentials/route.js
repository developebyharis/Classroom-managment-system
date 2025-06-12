import { createCredentials, getCredentials } from "@/server/controllers/credentialsController";



export async function GET(req) {
    return await getCredentials();
}


export async function POST(req) {
    return await createCredentials();
}