import Parser from "web-tree-sitter";
import { atom } from "../../input_file_info";
import { OneLineToken } from "../../token";
import * as IFI from '../../input_file_info';
import * as LSP from 'vscode-languageserver/browser';
import * as IUtil from '../../tree-sitter';


export class AtomAndCoordiante extends OneLineToken {
    atom: atom | undefined;
    x: number = NaN;
    y: number = NaN;
    z: number = NaN;
    is_valid: boolean = false;

    constructor(name: string, geo_item: Parser.SyntaxNode, root_node: Parser.SyntaxNode, input_file_info: IFI.input_file_info) {
        super(name, geo_item, root_node, input_file_info);
        if (this.get_diagnostic().length === 0) {
            this.is_valid == true;
        }
        this.input_file_info.geom.push({
            name: this.atom!,
            x: this.x,
            y: this.y,
            z: this.z,
            node: geo_item
        })
        try {
            this.input_file_info.nuclear_charge += IFI.get_atom_nuclear_charge(this.atom!);
        } catch (e) {
            console.log(e);
        }
    }

    get_diagnostic() {
        let r: LSP.Diagnostic[] = super.get_diagnostic();

        // 原子名有误
        if (IUtil.childOfType(this.node, ['atom_name']).length === 0) {
            let range = IUtil.range(this.node);
            r.push({
                range: { start: { line: range.start.line, character: 0 }, end: { line: range.start.line, character: 1 } },
                severity: LSP.DiagnosticSeverity.Error,
                code: 'atom-name-missing',
                source: 'XEDA diagnose',
                message: `Atom name is required!`,
            })
            return r;
        }
        let atom_node = IUtil.childOfType(this.node, ['atom_name'])[0]
        let atom_name = atom_node.text;
        if (!IFI.atom_string_list.includes(atom_name.toLowerCase())) {
            r.push({
                range: IUtil.range(atom_node),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-atom-name',
                source: 'XEDA diagnose',
                message: `${atom_name} is not a valid element name!`,
            })
            return r;
        }
        this.atom = atom_name as atom;
        // 坐标有误
        let coordinates_node = IUtil.childOfType(this.node, ['coordinates'])[0];
        let coordinate_node_list = IUtil.childOfType(coordinates_node, ['coordinate']);
        if (coordinate_node_list.length !== 3) {
            r.push({
                range: IUtil.range(coordinates_node),
                severity: LSP.DiagnosticSeverity.Error,
                code: 'wrong-coordinates',
                source: 'XEDA diagnose',
                message: `3 coordinates is expected, but ${coordinate_node_list.length} coordinate${coordinate_node_list.length === 1 ? '' : 's'} is given!`,
            })
            return r;
        }
        let coordinates: number[] = [];
        coordinate_node_list.forEach(coordinate => {
            if (isNaN(Number(coordinate.text))) {
                r.push({
                    range: IUtil.range(coordinate),
                    severity: LSP.DiagnosticSeverity.Error,
                    code: 'wrong-coordinates',
                    source: 'XEDA diagnose',
                    message: `Coordinate should be a number!`,
                })
            }
            coordinates.push(Number(coordinate.text));
        })
        if (coordinates.length !== 3) {
            return r;
        } else {
            this.x = coordinates[0];
            this.y = coordinates[1];
            this.z = coordinates[2];
        }

        return r;
    }
}