export default function App() {
    return (
        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 grid grid-cols-3 grid-rows-3 border-2">
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(cell => (
                <button key={cell} className="border-2">
                    1
                </button>
            ))
        }
        </main>
    )
}