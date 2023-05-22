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
    let ulClassName = `w-full h-full grid border-2 `;
    let maxWidth = 'max-w-[24rem]';
    if (n == '3') {
        ulClassName += ' grid-cols-3  grid-rows-3';
    } else if (n == '4') {
        ulClassName += ' grid-cols-4  grid-rows-4';
        maxWidth = 'max-w-[28rem]'
    }
    else if (n == '5') {
        ulClassName += ' grid-cols-5  grid-rows-5';
        maxWidth = 'max-w-[36rem]'
    }

    return (
        <main className={"w-full aspect-square p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " + maxWidth}>
            <ul className={ulClassName}>
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
                className={"w-full h-full border-2 text-4xl " + (isWinCell ? "bg-green-300 " : " hover:bg-gray-100")}
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