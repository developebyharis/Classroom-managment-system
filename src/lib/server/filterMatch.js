
import { getData } from "../../helper/getData";

export async function getTeacherDepartment(teacher) {
    const { department } = await getData();
    const matchedDepartment = department.find((dep) => dep.id === teacher.department_id);
    return matchedDepartment

}
export async function getTeacherCourses(teacher) {
    const { courses } = await getData();
    const matchedCourse = courses.find((course) => course.id === teacher.course_id);
    return matchedCourse;
}

export async function getTeacherBooking(teacher) {
    const { booking } = await getData();
    const matchedBooking = booking.data.booking.filter((book) => book.teacher_id === teacher.id);
    return matchedBooking;

}