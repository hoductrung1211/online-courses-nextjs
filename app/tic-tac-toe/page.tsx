'use client';

import { useEffect, useState } from "react";
import Game from "./Game";
import {winningColumns, winningCrossDown, winningCrossUp, winningRows, generateEmptyCells} from './utils';
import Header from "./Header";
import PopupWrapper from "./PopupWrapper";
import SettingsPopup, { SettingsForm } from "./SettingsPopup";
import './style.css';

export const enum Role {
    O = 'O',
    X = 'X'
}  

export const markOList = [
    {id: 1, mark: '🌠'},
    {id: 2, mark: '💛'},
    {id: 3, mark: '🌕'},
    {id: 4, mark: '🟨'},
    {id: 5, mark: '⭐'},
    {id: 6, mark: '🌟'},
];
export const markXList = [
    {id: 1, mark: '❤️'},
    {id: 2, mark: '💖'},
    {id: 3, mark: '🔴'},
    {id: 4, mark: '🟥'},
    {id: 5, mark: '❌'},
    {id: 6, mark: '⭕'},
]
export const nList = [
    {id: 1, mark: "3 x 3", n: 3},
    {id: 2, mark: "4 x 4", n: 4},
    {id: 3, mark: "5 x 5", n: 5},
]


export default function App() {
    // States of Application
    const [settings, setSettings] = useState({
        playerOName: 'Player O',
        playerXName: 'Player X',
        playerOMarkId: 5,
        playerXMarkId: 5,
        nId: 1,
    });
    const [count, setCount] = useState(0);

    const n = nList.find(item => item.id === settings.nId)?.n ?? 3;
    const [steps, setSteps] = useState(generateEmptyCells(n));
    const [playerTurn, setPlayerTurn] = useState(Role.O);
    const [popup, setPopup] = useState<React.ReactNode | null>(null);
    
    const markO = markOList.find(item => item.id === settings.playerOMarkId)?.mark ?? '⭐';
    const markX = markXList.find(item => item.id === settings.playerXMarkId)?.mark ?? '❌';

    // All possible steps that could win the game!
    const [wRows, setWRows] = useState(winningRows(n));
    const [wColumns, setWColumns] = useState(winningColumns(n));
    const [wCross, setWCross] = useState([winningCrossDown(n), winningCrossUp(n)]); 

    const [winCells, setWinCells] = useState<number[]>([]); 
    const isGameOver: boolean = winCells.length != 0;
    const mark = !isGameOver ? (playerTurn == Role.O ? markO : markX) : '';
 
    function checkGameResult(role: Role, nextSteps: {id: number, role: null | Role}[]) {
        // 1. Taking some possible steps have n elements (n in nxn game)
        const emptyArr: number[] = [];
        const playerCurrentSteps = nextSteps.reduce((res, step) => {
            return step.role === role ? [...res, step.id] : res;
        }, emptyArr); 
        
        // 2. Checking steps is in possible winSteps: 
        // Comparison between each possible steps with current steps
        wRows.forEach(rows => { 
            let flag = true;
            for (let i = 0; i < rows.length; i++) {
                if (!playerCurrentSteps.includes(rows[i]))
                    flag = false;
            }

            if (flag) setWinCells(rows);
        });
        wColumns.forEach(rows => { 
            let flag = true;
            for (let i = 0; i < rows.length; i++) {
                if (!playerCurrentSteps.includes(rows[i]))
                    flag = false;
            }

            if (flag) setWinCells(rows);
        });
        wCross.forEach(rows => { 
            let flag = true;
            for (let i = 0; i < rows.length; i++) {
                if (!playerCurrentSteps.includes(rows[i]))
                    flag = false;
            }

            if (flag) setWinCells(rows);
        });
    }

    function handlePlayerClick(id: number, role: Role) {
        if (!isGameOver) {
            const nextSteps = steps.map(step => {
                setPlayerTurn(role === Role.O ? Role.X : Role.O);
                return (step.id === id) ? {id, role} : step;
            });
            checkGameResult(role, nextSteps);
            setSteps(nextSteps);
        }
    }

    function handleTurnOffPopup() {
        setPopup(null);
    }

    function handleTurnOnSettingPopup() {
        setPopup(
            <SettingsPopup
                handleTurnOffPopup={handleTurnOffPopup}
            >
                <SettingsForm 
                    settings={settings}
                    handleUpdatingSettings={(nextNettings: 
                        {
                            playerOName: string,
                            playerXName: string,
                            playerOMarkId: number,
                            playerXMarkId: number,
                            nId: number,
                        }) => {
                            setSettings(nextNettings);
                            if (nextNettings.nId !== settings.nId) {
                                handleResetBoard()
                                const n = nList.find(item => item.id === nextNettings.nId)?.n ?? 3;
                                setSteps(generateEmptyCells(n));
                                setWRows(winningRows(n));
                                setWColumns(winningColumns(n));
                                setWCross([winningCrossDown(n), winningCrossUp(n)]); 
                            }
                            setPopup(null);
                    }}
                />
            </SettingsPopup>
        );
    }

    function handleResetBoard() {
        // Because count is the key of <Game> component
        // count changed -> <Game> component's state is reset
        setCount(count + 1); 
        setSteps(generateEmptyCells(n));
        setWinCells([]);
    }

    return (
        <>
            {popup && <PopupWrapper handleTurnOffPopup={handleTurnOffPopup}>{popup}</PopupWrapper>}
            <Header 
                handleTurnOnSettingPopup={handleTurnOnSettingPopup}
            />
            <Game 
                n={n.toString()}
                key={count}
                playerTurn={playerTurn}
                mark={mark}
                steps={steps}
                winCells={winCells}
                handleClick={handlePlayerClick}
            />
            <section className="">
                <button 
                    onClick={handleResetBoard}
                >
                    New game
                </button>
            </section>
        </>
    )
}
