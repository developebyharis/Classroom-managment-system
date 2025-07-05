import { createTeacher, deleteTeacher, getTeacher, updateTeacher } from "./controller";


export async function POST(req) {
  return await createTeacher(req);
  
}

export async function GET() {
  return await getTeacher();
  
}

