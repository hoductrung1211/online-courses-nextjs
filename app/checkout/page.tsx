'use client';

import React, { useState } from 'react';
import Cart from './Cart';
import Checkout from './Checkout';
import EditingProducts from './EditingProducts';
import PopupWrapper from './PopupWrapper';
import PaymentPopup from './PaymentPopup';

const initCourses = [
    {id: 0, name: 'Basic Web Front-end', schedule: 'Monday & Wednesday', timeDuration: '7PM - 9PM', openingDate: '15 May 2023', cost: 1600000},
    {id: 1, name: 'Basic C#', schedule: 'Tuesday & Thursday', timeDuration: '7PM - 9PM', openingDate: '16 May 2023', cost: 1000000},
    {id: 2, name: 'Basic Web Back-end', schedule: 'Thursday & Saturday', timeDuration: '9PM - 11PM', openingDate: '18 May 2023', cost: 2000000},
    {id: 3, name: 'Basic SQL', schedule: 'Friday & Sunday', timeDuration: '7PM - 9PM', openingDate: '19 May 2023', cost: 1000000},
]

export const paymentMethodAssets = [
    {id: 0, name: "momo", logo: "momo-logo.png", logoText: "momo_text.svg", color: "bg-momo"},
    {id: 1, name: "VNPAY", logo: "vnpay-logo.png", logoText: "/vnpay-text.png", color: "bg-vnpay"}, // 2980B9
    {id: 2, name: "ZaloPay", logo: "zalopay-logo.webp", logoText: "/zalopay-text.png", color: "bg-zalopay"}, // 118ACB
]

export default function Page() {
    const [courses, setCourses] = useState(initCourses);
    const [popup, setPopup] = useState<React.ReactNode | null>(null);

    const subtotal = courses.reduce((res, course) => res + course.cost, 0);

    function handleDeleteACourse(courseId: number) {
        setCourses(courses.filter(course => {
            return course.id !== courseId;
        }))
    }

    function handleTurnOffPopup() {
        setPopup(null);
    }

    function handleCheckout(methodId: number, total: number) {
        const methodAsset = paymentMethodAssets.find(item => item.id == methodId) ?? paymentMethodAssets[0];
        console.log(methodAsset)
        setPopup(<PaymentPopup 
                handleTurnOffPopup={handleTurnOffPopup} 
                methodAsset={methodAsset}
                total={total}
        />);
    }

    return (
        <main 
            className={`pt-8 pb-8 px-3 flex flex-col flex-wrap gap-6 container md:grid md:grid-cols-12`}
        >
            {
                popup && 
                <PopupWrapper handleTurnOffPopup={handleTurnOffPopup}>{popup}</PopupWrapper>
            }
            <Cart courses={courses} />
            <EditingProducts 
                courses={courses}
                handleDeleteACourse={handleDeleteACourse}
            />
            <Checkout 
                key={subtotal}
                subtotal={subtotal}
                handleCheckout={handleCheckout}    
            />
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