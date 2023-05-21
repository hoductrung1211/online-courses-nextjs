import { useEffect, useRef, useState } from "react"
import { Role } from "./page";

// Just generating cells
export default function Game({
    steps,
    playerTurn,
    winCells,
    n,
    mark,
    handleClick
}: {
    steps: {id: number, role: null | Role}[],
    playerTurn: Role,
    n: string,
    mark: string,
    winCells: number[],
    handleClick: (id: number, role: Role) => void,
}) {
    
    return (
        <main className="w-full max-w-[24rem] aspect-square p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <ul className={`w-full h-full grid grid-cols-${n} grid-rows-${n} border-2`}>
            {
                steps.map(item => 
                    <Cell 
                        key={item.id} 
                        value={mark}
                        isWinCell={winCells.includes(item.id)}
                        handleClick={() => {
                            handleClick(item.id, playerTurn);
                        }}
                    />
                )
            }
            </ul>
        </main>
    )
}

function Cell({
    value,
    isWinCell,
    handleClick,
}: {
    value: string,
    isWinCell: boolean,
    handleClick: () => void,
}) {
    const [isActive, setIsActive] = useState(false);
    const markRef = useRef<string | null>(null);

    return (
        <li 
            className="grid place-items-center"
        >
            <button 
                className={"w-full h-full border-2 text-3xl active:bg-gray-50 " + (isWinCell && "bg-green-300 ")}
                onClick={() => {
                    if (isActive) return;

                    handleClick();
                    setIsActive(true);
                    markRef.current = value;                 
                }}    
            >
            {isActive && markRef.current}
            </button>
        </li>
    )
}