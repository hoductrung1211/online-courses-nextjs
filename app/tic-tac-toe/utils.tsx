
// Take all n elements in the array and returns array
// if array's length is less than n, returns empty string
export function takeAllNElements(n: number, [...arr]: number[]): number[][] {
    const res: number[][] = [];
    const length = arr.length;
    
    for (let i = 0; i <= length - n; i++) {
        res.push(arr.slice(i, i + n))
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