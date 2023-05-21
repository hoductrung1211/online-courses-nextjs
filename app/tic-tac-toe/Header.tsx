export default function Header({
    handleTurnOnSettingPopup
}: {
    handleTurnOnSettingPopup: () => void
}) {
    return (
        <header className="w-full h-14 bg-slate-200">
            <div className="mx-auto w-full max-w-[1200px] h-full px-2 flex items-center justify-between">
                <span className="font-semibold">Tic-tac-toe</span>

                <button 
                    className="w-10 aspect-square text-3xl hover:bg-gray-100 rounded-md"
                    onClick={handleTurnOnSettingPopup}    
                >⚙️</button>
            </div>
        </header>
    )
}