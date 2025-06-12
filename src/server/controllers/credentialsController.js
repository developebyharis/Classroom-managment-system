import { db } from "@/server/db/connectDb";

export async function getCredentials(req) {
  try {
    const rows = await db.query("SELECT * FROM credentials");
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}


export async function createCredentials(req) {

}
export async function updateCredentials(req) {

}

export async function deleteCredentials(req) {
  
}

