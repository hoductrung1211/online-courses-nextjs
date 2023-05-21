'use client';

import { useState } from "react";
import Game from "./Game";
import {takeAllNElements, winningColumns, winningCrossDown, winningCrossUp, winningRows} from './utils';

export const enum Role {
    O = '⭐',
    X = '❌'
}
const initSteps: {id: number, role: null | Role}[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => ({
    id: item,
    role: null,
}))

console.log(winningRows(3));
console.log(winningColumns(3));
console.log([winningCrossDown(3), winningCrossUp(3)]);
const intNumArr: number[] = []

export default function App({

}) {
    const [count, setCount] = useState(0)
    const [steps, setSteps] = useState(initSteps);
    const [role, setRole] = useState(Role.O);

    const [wRows, setWRows] = useState(winningRows(3));
    const [wColumns, setWColumns] = useState(winningColumns(3));
    const [wCross, setWCross] = useState([winningCrossDown(3), winningCrossUp(3)]); 

    const [winCells, setWinCells] = useState(intNumArr); 
    const isGameOver: boolean = winCells.length != 0;

    function check(role: Role, nextSteps: {id: number, role: null | Role}[]) {
        const emptyArr: number[] = [];
        const playerCurrentSteps = nextSteps.reduce((res, step) => {
            return step.role === role ? [...res, step.id] : res;
        }, emptyArr);
        playerCurrentSteps.sort();
        
        const allPossibleSteps = takeAllNElements(3, playerCurrentSteps);
        allPossibleSteps.forEach(arr => {
            wRows.forEach(rows => rows.toString() === arr.toString() && setWinCells(arr));
            wColumns.forEach(rows => rows.toString() === arr.toString() && setWinCells(arr));
            wCross.forEach(rows => rows.toString() === arr.toString() && setWinCells(arr));
        })
    }

    function handlePlayerClick(id: number, role: Role) {
        if (!isGameOver) {
            const nextSteps = steps.map(step => {
                setRole(role === Role.O ? Role.X : Role.O);
                return (step.id === id) ? {id, role} : step;
            });
            check(role, nextSteps);
            setSteps(nextSteps);
        }
    }

    return (
        <>
            <section className="">

            </section>
            <Game 
                key={count}
                role={role}
                steps={steps}
                winCells={winCells}
                handleClick={handlePlayerClick}
            />
            <section className="">
                <button 
                    onClick={() => {
                        // If reseting reset, state of <Game> component is still there
                        // Reset <Game> component state
                        setCount(count + 1); 
                        setSteps(initSteps);
                        setWinCells([]);
                    }}
                >
                    Reset
                </button>
            </section>
        </>
    )
}
