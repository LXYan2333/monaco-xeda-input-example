import Parser from "web-tree-sitter";

// 为什么 TS 不支持反射啊！！！
export type method = 'rhf' | 'uhf' | 'rohf';
export const method_sting_list = ['rhf', 'uhf', 'rohf'];
export type print_level = 'brief' | 'detailed'
export const print_level_string_list = ['brief', 'detailed'];

export type atom = 'h' | 'he' | 'li' | 'be' | 'b' | 'c' | 'n' | 'o' | 'f' | 'ne' | 'na' | 'mg' | 'al' | 'si' | 'p' | 's' | 'cl' | 'ar' | 'k' | 'ca' | 'sc' | 'ti' | 'v' | 'cr' | 'mn' | 'fe' | 'co' | 'ni' | 'cu' | 'zn' | 'ga' | 'ge' | 'as' | 'se' | 'br' | 'kr' | 'rb' | 'sr' | 'y' | 'zr' | 'nb' | 'mo' | 'tc' | 'ru' | 'rh' | 'pd' | 'ag' | 'cd' | 'in' | 'sn' | 'sb' | 'te' | 'i' | 'xe' | 'cs' | 'ba' | 'la' | 'ce' | 'pr' | 'nd' | 'pm' | 'sm' | 'eu' | 'gd' | 'tb' | 'dy' | 'ho' | 'er' | 'tm' | 'yb' | 'lu' | 'hf' | 'ta' | 'w' | 're' | 'os' | 'ir' | 'pt' | 'au' | 'hg' | 'tl' | 'pb' | 'bi' | 'po' | 'at' | 'rn' | 'fr' | 'ra' | 'ac' | 'th' | 'pa' | 'u' | 'np' | 'pu' | 'am' | 'cm' | 'bk' | 'cf' | 'es' | 'fm' | 'md' | 'no' | 'lr' | 'rf' | 'db' | 'sg' | 'bh' | 'hs' | 'mt' | 'ds' | 'rg' | 'cn' | 'nh' | 'fl' | 'mc' | 'lv' | 'ts' | 'og';
export const atom_string_list = ['h', 'he', 'li', 'be', 'b', 'c', 'n', 'o', 'f', 'ne', 'na', 'mg', 'al', 'si', 'p', 's', 'cl', 'ar', 'k', 'ca', 'sc', 'ti', 'v', 'cr', 'mn', 'fe', 'co', 'ni', 'cu', 'zn', 'ga', 'ge', 'as', 'se', 'br', 'kr', 'rb', 'sr', 'y', 'zr', 'nb', 'mo', 'tc', 'ru', 'rh', 'pd', 'ag', 'cd', 'in', 'sn', 'sb', 'te', 'i', 'xe', 'cs', 'ba', 'la', 'ce', 'pr', 'nd', 'pm', 'sm', 'eu', 'gd', 'tb', 'dy', 'ho', 'er', 'tm', 'yb', 'lu', 'hf', 'ta', 'w', 're', 'os', 'ir', 'pt', 'au', 'hg', 'tl', 'pb', 'bi', 'po', 'at', 'rn', 'fr', 'ra', 'ac', 'th', 'pa', 'u', 'np', 'pu', 'am', 'cm', 'bk', 'cf', 'es', 'fm', 'md', 'no', 'lr', 'rf', 'db', 'sg', 'bh', 'hs', 'mt', 'ds', 'rg', 'cn', 'nh', 'fl', 'mc', 'lv', 'ts', 'og'];
export function get_atom_nuclear_charge(atom: atom): number {
    return atom_string_list.indexOf(atom.toLowerCase()) + 1;
}

export type basis = '3-21g' | '3-21g*' | '3-21g**' | '3-21+g' | '3-21+g*' | '3-21+g**' | '3-21++g' | '3-21++g*' | '3-21++g**' | '6-31g' | '6-31g*' | '6-31g**' | '6-31+g' | '6-31+g*' | '6-31+g**' | '6-31++g' | '6-31++g*' | '6-31++g**' | '6-311g' | '6-311g*' | '6-311g**' | '6-311+g' | '6-311+g*' | '6-311+g**' | '6-311++g' | '6-311++g*' | '6-311++g**' | 'cc-pvdz' | 'cc-pvtz' | 'cc-pvqz' | 'aug-cc-pvdz' | 'aug-cc-pvtz' | 'aug-cc-pvqz' | 'def2-svp' | 'def2-svpp' | 'def2-tzvp' | 'def2-tzvpp' | 'def2-qzvp' | 'def2-qzvpp' | 'def2-qzvpd'
export const basis_stirng_list = ['3-21g', '3-21g*', '3-21g**', '3-21+g', '3-21+g*', '3-21+g**', '3-21++g', '3-21++g*', '3-21++g**', '6-31g', '6-31g*', '6-31g**', '6-31+g', '6-31+g*', '6-31+g**', '6-31++g', '6-31++g*', '6-31++g**', '6-311g', '6-311g*', '6-311g**', '6-311+g', '6-311+g*', '6-311+g**', '6-311++g', '6-311++g*', '6-311++g**', 'cc-pvdz', 'cc-pvtz', 'cc-pvqz', 'aug-cc-pvdz', 'aug-cc-pvtz', 'aug-cc-pvqz', 'def2-svp', 'def2-svpp', 'def2-tzvp', 'def2-tzvpp', 'def2-qzvp', 'def2-qzvpp', 'def2-qzvpd'];

export type dft = 'blyp' | 'b3lyp' | 'b3lyp-d3' | 'b3lyp-d3bj' | 'cam-b3lyp' | 'pbe' | 'pbe0' | 'm06-2x' | 'wb97xd';
export const dft_string_list = ['blyp', 'b3lyp', 'b3lyp-d3', 'b3lyp-d3bj', 'cam-b3lyp', 'pbe', 'pbe0', 'm06-2x', 'wb97xd'];

export type eda_method = 'exact' | 'fast';
export const eda_method_string_list = ['exact', 'fast'];

export interface atom_and_coordiante {
    name: atom | undefined;
    x: number;
    y: number;
    z: number;
    node: Parser.SyntaxNode;
}

export interface monomer {
    index: number;
    atom_and_coordinate_list: atom_and_coordiante[];
    atom_count: number;
    mult: number;
    charge: number;
    nuclear_charge: number;
}

export class input_file_info {
    method: method | undefined = undefined;
    basis: basis | undefined = undefined;
    dft: dft | 'HF' = 'HF';
    nmul: number = 1;
    charge: number = 0;
    nuclear_charge: number = 0;
    max_iter: number = 50;
    print_level: print_level = 'brief';
    geom: atom_and_coordiante[] = [];
    nmol: number | undefined = undefined;
    have_eda_section: boolean = false;
    eda_method: eda_method | undefined = undefined;
    matom: number[] = [];
    mmult: number[] = [];
    mcharge: number[] = [];
    monomer_list: monomer[] = [];

    constructor() {
    }
}