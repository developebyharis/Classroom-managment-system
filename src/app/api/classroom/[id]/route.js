import { deleteClassroom, updateClassroom } from "../controller"

export async function UPDATE(req) {
  return await updateClassroom(req)
}


export async function DELETE(req) {
  return await deleteClassroom()
}