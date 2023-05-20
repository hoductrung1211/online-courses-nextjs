import toVnd from "@/utils/toVnd";
import Image from "next/image";
import { useEffect, useState } from "react";

const qrs = [
    "/qr.png",
    "/qr2.webp",
    "/qr3.png",
    "/qr4.png",
    "/qr5.png", 
]

function randomQR() {
    const i = Math.round(Math.random() * (qrs.length - 1))
    return qrs[i];
}

function useCounter() {
    const [count, setCount] = useState(60);

    useEffect(() => {
        const countRef = setTimeout(() => {
            setCount(count - 1);
        }, 1000);

        return clearTimeout(countRef);
    });

    return count;
} 

export default function PaymentPopup({
    handleTurnOffPopup,
    methodAsset,
    total
}: {
    handleTurnOffPopup: () => void,
    methodAsset: {id: number, name: string, logo: string, logoText: string, color: string},
    total: number
}) { 
    const [qrSrc, setQrSrc] = useState(randomQR()); // Is not different with prev QR yet

    const [counter, setCount] = useState(5);

    useEffect(() => {
        const nextCouter = counter - 1;

        let ignore = false;

        if (nextCouter >= 0)  {
            setTimeout(() => {
                if (!ignore)
                    setCount(counter - 1);
            }, 1000);
        }
        else resetQr();
 
        return () => {ignore = true}
    }, [counter]);


    function resetQr() {
        updateQr();
        setCount(5);
    }

    function updateQr() {
        let nextQr;
        while(true) {
            nextQr = randomQR();
            if (nextQr === qrSrc)
                continue;
            
            setQrSrc(nextQr);
            break;
        }
    }


    return ( 
        <main 
            key={methodAsset.id}
            className="w-full h-full max-w-[480px] max-h-[750px] flex flex-col bg-white rounded-lg overflow-hidden"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <header className="w-full h-10 grid place-items-center bg-f4">
                Payment QR
            </header>
            <main className="relative h-full text-xs">
                <section className={`relative w-full h-[24rem] ${methodAsset.color} text-white px-2`}>
                    <Image 
                        className="absolute top-12 left-1/2 -translate-x-1/2 w-[120px]"
                        width={120}
                        height={25}
                        src={methodAsset.logoText}
                        alt="momo_text"
                    />
                    <div className="absolute w-48 h-48 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image 
                            key={qrSrc}
                            width={400}
                            height={400}
                            src={qrSrc}
                            alt="QR code"
                        />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-full text-center">
                        <p className="">Use App Momo or the camera supporting QR code to scan</p>
                        <p className="mt-3">
                            Update automatically after {counter} seconds.
                            {' '}
                            <span className="font-bold cursor-pointer" onClick={resetQr}>Update</span>
                        </p>
                    </div>
                </section>
                <section className="p-3 flex flex-col gap-3">
                    <p className="flex justify-between items-center">
                        Payment method:
                        <span className="font-bold">{methodAsset.name}</span>
                    </p>
                    <p className="flex justify-between items-center">
                        Total: 
                        <span className="font-bold">{toVnd(total)}</span>
                    </p>
                </section>
                <button 
                    className="absolute bottom-0 mt-auto bg-f4 w-full h-12 text-sm font-bold"
                    onClick={handleTurnOffPopup}
                >
                    Cancel
                </button>
            </main>
        </main>
    )
}
 