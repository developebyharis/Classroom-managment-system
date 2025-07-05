import { db } from "@/lib/connectDb";

export async function GET() {
  try {
    const courses = await db`SELECT * FROM courses`;
    
    return Response.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return Response.json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message
    }, { status: 500 });
  }
} 