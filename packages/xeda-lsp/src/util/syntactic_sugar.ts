/**
 * 语法糖，对应 1:3 -> [1,1,2,2,3,3]。
 * @param first 第一个数。tree-sitter会保证其为整数，因此不做特判。
 * @param second 第二个数。tree-sitter会保证其为整数，因此不做特判。
 * @returns 包含所有数的数组。
 */
export function int_colon(first: string, second: string): number[] {
    let start_num = parseInt(first);
    let end_num = parseInt(second);
    let r: number[] = [];
    for (let i = start_num; i <= end_num; i++) {
        r.push(i);
        r.push(i);
    }
    return r;
}

/**
 * 语法糖，对应 1*3 -> [1,1,1]。
 * @param num 数字。tree-sitter会保证其为整数，因此不做特判。
 * @param times 次数。tree-sitter会保证其为整数，因此不做特判。
 * @returns 包含所有数的数组。
 */
export function int_asterisk(num: string, times: string): number[] {
    let num_num = parseInt(num);
    let times_num = parseInt(times);
    let r: number[] = [];
    for (let i = 0; i < times_num; i++) {
        r.push(num_num);
    }
    return r;
}

/**
 * 语法糖，对应 1-3 -> [1,2,3]。
 * @param start 开始数。tree-sitter会保证其为整数，因此不做特判。
 * @param end 结束数。tree-sitter会保证其为整数，因此不做特判。
 * @returns 包含所有数的数组。
 */
export function int_minor(start: string, end: string): number[] {
    let start_num = parseInt(start);
    let end_num = parseInt(end);
    let r: number[] = [];
    for (let i = start_num; i <= end_num; i++) {
        r.push(i);
    }
    return r;
}