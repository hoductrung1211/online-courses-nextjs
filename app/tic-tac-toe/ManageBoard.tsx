import { Field } from "./SettingsPopup"

export default function ManageBoard({
    playerOName,
    playerXName,
    gameType,
    handleResetBoard
}: {
    playerOName: string,
    playerXName: string,
    gameType: string,
    handleResetBoard: () => void,
}) {
    return (
        <aside className="absolute flex flex-col w-80 top-40 right-10 rounded-lg overflow-hidden">
            <header className="w-full h-12 flex items-center gap-1 px-3 bg-gray-100 text-sm font-semibold">
                <span className="text-2xl">🎯</span> Managing Dashboard
            </header>
            <main className="flex flex-col gap-5 p-3 pt-4 border-gray-100 border-2  border-t-0 h-full rounded-lg">
                <Field text="Game type:"><span className="font-bold">{gameType}</span></Field>
                <Field text={playerOName}> </Field>
                <Field text={playerXName}> </Field>
                <Field text="Draw"> </Field>
                <button 
                    className="mt-6 text-sm font-semibold h-10 rounded-md bg-blue-100 hover:bg-opacity-80 transition"
                    onClick={handleResetBoard}                    
                >
                    New Game
                </button>
            </main>
        </aside>
    )
}