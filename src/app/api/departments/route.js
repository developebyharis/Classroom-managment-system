import { db } from "@/lib/connectDb";

export async function GET() {
  try {
    const departments = await db`SELECT * FROM department`;
    
    return Response.json({
      success: true,
      data: departments
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return Response.json({
      success: false,
      message: "Failed to fetch departments",
      error: error.message
    }, { status: 500 });
  }
} 