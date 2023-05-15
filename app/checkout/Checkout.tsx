
import Section from './Section';
import toVnd from '../../utils/toVnd';
import { useState } from 'react';

export default function Checkout({
    subtotal
}: {
    subtotal: number
}) {
    return (
        <div className='md:col-span-6 min-[1200px]:col-span-4'>
            <Section title="Checkout">
                <div className='flex flex-col gap-4'>
                    <CustomerInformation />
                    <Voucher />
                    <Payment subtotal={subtotal} discount={200000} />
                    <PaymentMethod />
                </div>
            </Section>
        </div>
        
    )
}


// Components
function SubSection({
    title,
    children
}: {
    title: string,
    children: React.ReactNode,
}) {
    return (
        <section className=''>
            <h4 className='flex items-center border-gray-200 text-sm font-bold'>{title}</h4>
            <ul className='mt-1 flex flex-col gap-2'>
                {children}
            </ul>
        </section>
    )
}

function Field({
    text,
    children
}: {
    text: string,
    children: React.ReactNode
}) {
    return (
        <li className='w-full flex items-center justify-between'>
            <span className='shrink-0 w-full max-w-[8rem]'>{text}</span>
            {children}
        </li>
    )
}

function Input({

}) {
    return (
        <input 
            className='w-full min-w-[3rem]  h-7 bg-f4 rounded'
        />
    )
}

function Dropdown({
    options
}: {
    options: {id: number, text: string}[]
}) {
    return (
        <select className='bg-f4 rounded px-2'>
        {options.map(option => (
            <option className='text-center' key={option.id}>{option.text}</option>
        ))}
        </select>
    )
}

// SubSection Components 
function CustomerInformation({

}) {
    return (
        <SubSection title='Customer Information'>
            <Field text='Name:'>
                Ho Duc Trung
            </Field>
            <Field text='Phone number:'>
                0123546789                
            </Field>
            <Field text='Email:'>
                hoductrung@gmail.com
            </Field>
        </SubSection>
    )
}

function Voucher({

}) {
    const bspoint = 200000;
    const options = [
        {id: 0, text: 'Do not use Bsmart'},
        {id: 1, text: 'Use Bsmart'},
    ];



    return (
        <SubSection title='Voucher'>
            <Field text='Inviting code:'>
                <Input />
            </Field>
            <Field text='Discount code:'>
                <Input />
            </Field>
            <Field text='Use Bsmart Coin:'>
                <div className='w-full flex gap-1'>
                    <Input />
                    <select className='bg-f4 rounded px-2'>
                        {options.map(option => (
                            <option className='text-center' key={option.id}>{option.text}</option>
                        ))}
                    </select>
                </div>
            </Field>
            <p className='text-end italic text-gray-400'>You have <span className="font-bold text-gray-600">{bspoint.toLocaleString()}</span> point</p>
        </SubSection>
    )
}

function Payment({
    subtotal,
    discount,
}: {
    subtotal: number,
    discount: number,
}) {
    if (subtotal === 0)
        discount = 0;

    const total = subtotal - discount;

    return (
        <SubSection title='Payment'>
            <Field text='Subtotal:'>
                <span className='font-bold'>{toVnd(subtotal)}</span>
            </Field>
            <Field text='Discount:'>
                <span className='font-bold text-orange-400'>- {toVnd(discount)}</span>
            </Field>
            <Field text='Total:'>
                <span className='font-bold text-blue-400'>{toVnd(total)}</span>
            </Field>
        </SubSection>
    )
}

const paymentMethods = [
    {id: 0, name: 'Momo', src: 'momo-logo.png'},
    {id: 1, name: 'VNpay', src: 'vnpay-logo.png'},
    {id: 2, name: 'Zalopay', src: 'zalopay-logo.webp'},
]

function PaymentMethod({

}) {
    const [selectedMethodId, setSelectedMethodId] = useState(paymentMethods[0].id);

    return (
        <SubSection title='Payment Method'>
            <div className='mt-6 flex justify-center items-center gap-8'>
            {paymentMethods.map(method => (
                <button 
                    key={method.id}
                    className={`flex w-16 p-1 aspect-square xs:w-20 rounded-xl  border-gray-300 ${selectedMethodId === method.id && 'border-2'}`}
                    onClick={() => setSelectedMethodId(method.id)}
                > 
                    <img src={method.src} />
                </button>
            ))}
            </div>

            <button className='mt-8 mb-2 h-10 rounded-lg bg-blue-400 font-bold text-white'>
                Confirm
            </button>
        </SubSection>
    )
}
