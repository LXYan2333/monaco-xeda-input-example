export function isPositiveInteger(str: string, can_be_zero: boolean): boolean {
    if (can_be_zero) {
        return /^0$/.test(str) || /^[1-9]\d*$/.test(str);
    } else {
        return /^[1-9]\d*$/.test(str);
    }
}

export function isFloat(str: string, shoudl_be_positive: boolean): boolean {
    if (shoudl_be_positive) {
        return /^(?:[1-9][0-9]*\.)|(0\.)|\.\d+$/.test(str);
    } else {
        return /^-?(?:[1-9][0-9]*\.)|(0\.)|\.\d+$/.test(str);
    };
}