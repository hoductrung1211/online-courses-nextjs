import { Role } from "./page";

export function generateEmptyCells(n: number): {id: number, role: null | Role}[] {
    const len = n * n;
    const res = [];

    for (let i = 1; i <= len; i++) {
        res.push({
            id: i,
            role: null
        })
    }

    return res;
}

export function winningRows(len: number, initValue=1) {
    let res = [];
    for (let i = 0; i < len; i++) {
        let arr = [];
        for (let j = 0; j < len; j++)
            arr.push(initValue + len*i + j);

        res.push(arr);
    }
    return res;
}

export function winningColumns(len: number, initValue=1) {
    let res = [];
    for (let i = 0; i < len; i++) {
        let arr = [];
        for (let j = 0; j < len; j++)
            arr.push(initValue + len*j + i);

        res.push(arr);
    }
    return res;
}

export function winningCrossDown(len: number, initValue=1) {
    let res = [];
    for (let i = 0; i < len; i++) {
        res.push(initValue + (len + 1)*i);
    }
    return res;
}

export function winningCrossUp(len: number ) {
    let res = [];
    for (let i = 0; i < len; i++) {
        res.push(len + (len - 1)*i);
    }
    return res;
}