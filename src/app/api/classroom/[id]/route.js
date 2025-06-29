import { deleteClassroom, getClassroom, updateClassroom } from "../controller"

export async function UPDATE(req) {
  return await updateClassroom(req)
}


export async function DELETE(req) {
  return await deleteClassroom()
}

export async function GET(req) {
  return await getClassroom(req)
}