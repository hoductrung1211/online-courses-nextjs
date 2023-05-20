'use client';

export default function PopupWrapper({
    children,
    handleTurnOffPopup,
}: {
    children: React.ReactNode,
    handleTurnOffPopup: () => void,
}) { 
    return (
        <section 
            className="grid place-items-center p-3 fixed inset-0 bg-black bg-opacity-70 transition animation-fade-in z-10"
            onClick={handleTurnOffPopup}
        >
            {children}
        </section>
    )
}