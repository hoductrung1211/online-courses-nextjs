export default function PopupWrapper({
    children,
    handleTurnOffPopup,
}: {
    children: React.ReactNode,
    handleTurnOffPopup: () => void,
}) {
    return (
        <section 
            className="fixed inset-0 bg-black bg-opacity-75 z-20 flex items-center justify-center"
            onClick={handleTurnOffPopup}
        >
            {children}
        </section>
    )
}