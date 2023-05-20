import { Course } from './page'; 
import Section from './Section';
import toVnd from '../../utils/toVnd';

export default function Cart({
    courses
}: {
    courses: Course[]
}) {
    return (
        <div className='hidden lg:block col-span-3'>
            <Section title="Cart" >
                <ul className="w-full flex flex-col gap-3 ">
                    {courses.map(course => (
                        <CourseCart key={course.id} course={course} />
                    ))}
                </ul>
                {courses.length == 0 && <p className='text-gray-400'>The cart is empty</p>}
            </Section>
        </div>
    )
}

function CourseCart({
    course
}: {
    course: Course
}) {
    return (
        <li 
            className="flex flex-col gap-3 p-2 rounded-lg bg-f4"
        >
            <h3 className="pl-1 font-bold">{course.name}</h3>
            <p className="flex items-center justify-between">
                <span className="w-8 flex items-center justify-center">
                    <i className="fa-solid fa-calendar-days fa-lg"></i>
                </span>
                {course.schedule}
            </p>
            <p className="flex items-center justify-between">
                <span className="w-8 flex items-center justify-center">
                    <i className="fa-solid fa-clock fa-lg"></i>
                </span>
                {course.timeDuration}
            </p>
            <p className="flex items-center justify-between">
                <span className="w-8 flex items-center justify-center">
                    <i className="fa-solid fa-money-bill fa-lg"></i>
                </span>
                <span className="text-blue-400">{toVnd(course.cost)}</span>
            </p>
        </li>
    )
}