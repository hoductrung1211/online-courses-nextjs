'use client';

import { useState } from 'react';
import Cart from './Cart';
import Checkout from './Checkout';
import EditingProducts from './EditingProducts';

const initCourses = [
    {id: 0, name: 'Basic Web Front-end', schedule: 'Monday & Wednesday', timeDuration: '7PM - 9PM', openingDate: '15 May 2023', cost: 1600000},
    {id: 1, name: 'Basic C#', schedule: 'Tuesday & Thursday', timeDuration: '7PM - 9PM', openingDate: '16 May 2023', cost: 1000000},
    {id: 2, name: 'Basic Web Back-end', schedule: 'Thursday & Saturday', timeDuration: '9PM - 11PM', openingDate: '18 May 2023', cost: 2000000},
    {id: 3, name: 'Basic SQL', schedule: 'Friday & Sunday', timeDuration: '7PM - 9PM', openingDate: '19 May 2023', cost: 1000000},
]

export default function Page() {
    const [courses, setCourses] = useState(initCourses);

    const subtotal = courses.reduce((res, course) => res + course.cost, 0);

    function handleDeleteACourse(courseId: number) {
        setCourses(courses.filter(course => {
            return course.id !== courseId;
        }))
    }

    return (
        <main className="pt-8 px-3 flex flex-col flex-wrap gap-6 container lg:grid lg:grid-cols-12">
            <Cart courses={courses} />
            <EditingProducts 
                courses={courses}
                handleDeleteACourse={handleDeleteACourse}
            />
            <Checkout subtotal={subtotal} />
        </main>
    )
}

export interface Course {
    id: number;
    name: string;
    schedule: string;
    timeDuration: string;
    openingDate: string;
    cost: number;
}