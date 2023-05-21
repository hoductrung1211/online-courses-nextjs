import { useState } from "react"
import { Role } from "./page";

export default function Game({
    steps,
    role,
    winCells,
    handleClick
}: {
    steps: {id: number, role: null | Role}[],
    role: Role,
    winCells: number[],
    handleClick: (id: number, role: Role) => void,
}) {
    
    return (
        <main>
            <ul className="w-96 aspect-square grid grid-cols-3 grid-rows-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2">
            {
                steps.map(item => 
                    <Cell 
                        key={item.id} 
                        value={item.role ?? ''}
                        isWinCell={winCells.includes(item.id)}
                        handleClick={() => {
                            handleClick(item.id, role);
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

    return (
        <li 
            className="grid place-items-center"
            onClick={() => setIsActive(true)}
        >
            <button 
                className={"w-full h-full border-2 text-3xl " + (isWinCell && "bg-green-300 ")}
                onClick={() => {
                    if (isActive) return;

                    handleClick();
                    setIsActive(true);                    
                }}    
            >
            {isActive && value}
            </button>
        </li>
    )
}