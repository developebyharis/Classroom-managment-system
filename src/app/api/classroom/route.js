import { createClassroom, deleteClassroom, getClassroom, updateClassroom } from "./controller";

export async function POST(req) {
  return await createClassroom(req);
}

export async function GET() {
    return await getClassroom();
}


