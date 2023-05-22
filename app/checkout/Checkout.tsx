'use client';

import Section from './Section';
import toVnd from '../../utils/toVnd';
import { ChangeEvent, useState } from 'react';
import { paymentMethodAssets } from './page';

export default function Checkout({
    subtotal,
    handleCheckout,
}: {
    subtotal: number,
    handleCheckout: (id: number, total: number) => void,
}) { 
    const [vouchers, setVouchers] = useState({
        invitingCode: '',
        discountCode: '',
        bsmartCoint: '0', 
    })
    const bspoint = 200_000;
    const options = subtotal !== 0 ? [
        {value: "true", text: 'Use Bsmart'},
        {value: "false", text: 'Do not use Bsmart'},
    ] : [
        {value: "false", text: 'Do not use Bsmart'},
    ]
    const [isCoinUsed, setIsCoinUsed] = useState(subtotal !== 0 ? options[0].value : "false");
    const discount = (vouchers.bsmartCoint === '' ? 0 : parseInt(vouchers.bsmartCoint));

    function handleChangeValue(name: string, value: string) {
        setVouchers({
            ...vouchers,
            [name]: value,
        })
    }

    function handleSelectChanged(e: ChangeEvent<HTMLSelectElement>) {
        setIsCoinUsed(e.target.value);
        if (e.target.value === 'false')
            setVouchers({
                ...vouchers,
                bsmartCoint: '0',
            }) 
    }
    return (
        <div className='md:col-span-6 lg:col-span-4'>
            <Section title="Checkout">
                <div className='flex flex-col gap-4'>
                    <CustomerInformation />
                    <Voucher  
                        vouchers={vouchers}
                        bspoint={bspoint}
                        options={options}
                        isCoinUsed={isCoinUsed}
                        handleChangeValue={handleChangeValue}
                        handleSelectChanged={handleSelectChanged}
                    />
                    <Payment subtotal={subtotal} discount={discount} />
                    <PaymentMethod
                        handleCheckout={handleCheckout}
                        total={subtotal - discount}
                    />
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
            <span className='shrink-0 w-full max-w-[7rem]'>{text}</span>
            {children}
        </li>
    )
}

function Input({
    disabled = false,
    value,
    handleChangeValue,
}: {
    disabled?: boolean,
    value: string,
    handleChangeValue: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <input 
            className={'w-full min-w-[3rem] h-7 rounded ' + (disabled ? 'bg-black bg-opacity-20' : 'bg-f4')}
            value={value}
            disabled={disabled}
            onChange={handleChangeValue}
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
    vouchers,
    bspoint,
    options,
    isCoinUsed,
    handleChangeValue,
    handleSelectChanged,
}: {
    vouchers: {[key: string]: string},
    bspoint: number,
    options: {value: string, text: string}[],
    isCoinUsed: string,
    handleChangeValue: (name: string, value: string) => void,
    handleSelectChanged: (e: ChangeEvent<HTMLSelectElement>) => void
}) {
  
    return (
        <SubSection title='Voucher'>
            <Field text='Inviting code:'>
                <Input
                    value={vouchers.invitingCode} 
                    handleChangeValue={e => handleChangeValue('invitingCode', e.target.value)}
                />
            </Field>
            <Field text='Discount code:'>
                <Input
                    value={vouchers.discountCode} 
                    handleChangeValue={e => handleChangeValue('discountCode', e.target.value)}
                />
            </Field>
            <Field text='Use Bsmart Coin:'>
                <div className='w-full overflow-hidden flex gap-1'>
                    <Input 
                        disabled={isCoinUsed === "false"}
                        value={vouchers.bsmartCoint} 
                        handleChangeValue={e => {
                            const inputPoint = e.target.value;

                            if ((parseInt(inputPoint) <= bspoint) || inputPoint === '')
                                handleChangeValue('bsmartCoint', inputPoint);
                        }}
                    />
                    <select 
                        className='bg-f4 rounded sm:px-2'
                        onChange={handleSelectChanged}
                    >
                        {options.map(option => (
                            <option 
                                className='text-center' 
                                key={option.value}
                                value={option.value}
                            >
                                {option.text}
                            </option>
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

 

function PaymentMethod({
    handleCheckout,
    total
}: {
    handleCheckout: (id: number, total: number) => void,
    total: number
}) {
    const [selectedMethodId, setSelectedMethodId] = useState(paymentMethodAssets[0].id);

    return (
        <SubSection title='Payment Method'>
            <div className='mt-6 flex justify-center items-center gap-8'>
            {paymentMethodAssets.map(method => (
                <button 
                    key={method.id}
                    className={`flex w-16 p-1 aspect-square xs:w-20 rounded-xl  border-gray-300 ${selectedMethodId === method.id && 'border-2'}`}
                    onClick={() => setSelectedMethodId(method.id)}
                > 
                    <img src={method.logo} />
                </button>
            ))}
            </div>

            <button 
                className={'mt-8 mb-2 h-10 rounded-lg font-bold text-white ' + (total !== 0 ? 'bg-blue-400 ' : ' bg-gray-300')}
                onClick={() => total && handleCheckout(selectedMethodId, total)}
            >
                Confirm
            </button>
        </SubSection>
    )
}
