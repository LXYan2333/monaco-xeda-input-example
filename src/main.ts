import { attach_monaco_to } from "monaco-xeda-input";


let a = attach_monaco_to(document.getElementById('app')!, `$ctrl
method=rhf basis = 6-31g* DFT=b3lyp
nmul=1 charge=0
$end
$geom
O     1.2245363506   1.9369107829  -1.5249005020
H     0.6059851978   2.5732298867  -1.8865861643
H     1.1674934363   2.0403343903  -0.5520881596
O     1.4426170965   2.2936999659   1.1607557179
H     2.4102571835   2.4430589600   1.2006505497
H     1.2658427477   1.5917744265   1.7885628634
O     4.1276499342   2.6315069165   0.8942820200
H     4.5631857354   3.4690433373   1.0588206123
H     4.1895885441   2.4896149845  -0.0733228603
O     3.9157890062   2.2134800316  -1.7828881536
H     2.9430129055   2.1035712740  -1.8276494239
H     4.2809601224   1.4397383938  -2.2142395894
$end
$eda
nmol = 4
method=exact
matom = 3 3 3 3 
mmult = 1 1 1 1 
mcharge = 0 0 0 0
$end
`, 'Fira Code');


a.then(editor => {
    console.log(editor!.getModel()!.getValue());
});

// import './vscode-plugins';



// (async () => {
//     await Parser.init({
//         locateFile(_scriptName: string, _scriptDirectory: string) {
//             return 'node_modules/web-tree-sitter/tree-sitter.wasm?init';
//         },
//     });
//     const parser = new Parser();
//     const Lang = await Parser.Language.load('node_modules/tree-sitter-xeda-input/tree-sitter-XEDA.wasm?init');
//     parser.setLanguage(Lang);
//     const tree: Parser.Tree = parser.parse(`$ctrl
// method=
// rhf basis = 6-31g* DFT=b3lyp
// nmul=1 charge=0
// $end
// $geom
// O     1.2245363506   1.9369107829  -1.5249005020
// H     0.6059851978   2.5732298867  -1.8865861643
// H     1.1674934363   2.0403343903  -0.5520881596
// O     1.4426170965   2.2936999659   1.1607557179
// H     2.4102571835   2.4430589600   1.2006505497
// H     1.2658427477   1.5917744265   1.7885628634
// O     4.1276499342   2.6315069165   0.8942820200
// H     4.5631857354   3.4690433373   1.0588206123
// H     4.1895885441   2.4896149845  -0.0733228603
// O     3.9157890062   2.2134800316  -1.7828881536
// H     2.9430129055   2.1035712740  -1.8276494239
// H     4.2809601224   1.4397383938  -2.2142395894
// $end
// $eda
// nmol = 4
// method=exact
// matom = 3 3 3 3 
// mmult = 1 1 1 1 
// mcharge = 0 0 0 0
// $end
// `);
//     console.log(tree.rootNode);
//     console.log(tree.rootNode.descendantsOfType('ctr_start_token'));
//     // // console.log(tree.rootNode.children[2]);
//     // console.log(tree.rootNode.children.filter((node) => node.type === 'ctrl_section')[0].childForFieldName('items_list')?.text);
//     // console.log(tree.rootNode.childForFieldName('ctrl_section')?.text);

// })();