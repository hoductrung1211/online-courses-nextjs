import { Course } from './page'; 
import Section from './Section';
import toVnd from '../../utils/toVnd';

export default function EditingProducts({
    courses,
    handleDeleteACourse
}: {
    courses: Course[],
    handleDeleteACourse: (courseId: number) => void,
}) {
    return (
        <div className='md:col-span-6 min-[1200px]:col-span-5'>
            <Section title="Editing Products">
                <p className='w-full text-end'>
                    You have <span className="font-bold">{courses.length}</span> course in the course
                </p>

                <ul className="mt-3 w-full flex flex-col gap-3">
                    {courses.map(course => (
                        <Product 
                            key={course.id} 
                            course={course}
                            handleDeleteACourse={handleDeleteACourse}
                        />
                    ))}
                </ul>
            </Section>
        </div>
        
    )
}

function Product({
    course,
    handleDeleteACourse,
}: {
    course: Course,
    handleDeleteACourse: (courseId: number) => void,
}) {
    return (
        <li 
            key={course.id}
            className="flex flex-col xs:flex-row gap-3 p-4 rounded-lg bg-f4 "
        >
            <div className="hidden xs:block w-36 aspect-square shrink-0 rounded-md bg-slate-300">

            </div>
            <div className="w-full flex flex-col gap-1.5 xs:gap-2">
                <p className="flex justify-between">
                    Course name: 
                    <span className="font-bold">{course.name}</span>
                </p>
                <p className="flex justify-between">
                    Schedule:
                    <span className="font-bold">{course.schedule}</span>
                </p>
                <p className="flex justify-between">
                    Time duration: 
                    <span className="font-bold">{course.timeDuration}</span>
                </p>
                <p className="flex justify-between">
                    Opening date:
                    <span className="font-bold">{course.openingDate}</span>
                </p>
                <p className="flex justify-between">
                    Cost
                    <span className="font-bold text-blue-400">{toVnd(course.cost)}</span>
                </p>

                <button 
                    className='mt-auto ml-auto text-red-600'
                    onClick={() => handleDeleteACourse(course.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}