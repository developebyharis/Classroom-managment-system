import { deleteTeacher, updateTeacher } from "../controller"

export async function UPDATE(req) {
    return await updateTeacher(req)
}

export async function DELETE(req){
    return await deleteTeacher(req)
}