import { db } from "@/lib/connectDb";

export async function getCredentials() {
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

export async function createCredentials(req, res) {
  try {
    const body = await req.json();
    const { username, password } = body;
    await db.query(
      `INSERT INTO credentials (username, password, role) VALUES ("${username}", "${password}", "Teacher")`
    );
    return res.status(200);
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
export async function updateCredentials(req) {}

export async function deleteCredentials(req) {}
