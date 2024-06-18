import { attach_monaco_to } from "monaco-xeda-input";
import { attach_molstar_viewer_to } from "xeda-molstar-viewer";
import { editor } from "monaco-editor";

let inputfile = `$ctrl
method=rhf basis = 6-31g* DFT=b3lyp
nmul=1 charge=0 print_level = brief
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
`

let searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('input-file')) {
    inputfile = searchParams.get('input-file')!;
}


let a = attach_monaco_to(document.getElementById('app')!, inputfile, 'Fira Code');



a.then(({ editor, connection }) => {

    // add a button to allow user to share url that contains the content of the editor
    let share_button = document.getElementById('share-button')!;
    share_button.addEventListener('click', () => {
        let url = new URL(window.location.href);
        url.searchParams.set('input-file', editor!.getModel()!.getValue());
        copyToClipboard(url.toString()).then(() => {
            alert('Input file share URL copied to clipboard');
        });
    });

    console.log(editor!.getModel()!.getValue());
    editor.onDidChangeCursorPosition(e =>
        // @ts-ignore
        connection.writer.write({
            // @ts-ignore
            jsonrpc: '2.0', method: 'onCursorChangePosition', param: { line: e.position.lineNumber - 1, character: e.position.column - 1 }
        })
    );
    let viewer = document.getElementById('viewer')!;
    let molstar = attach_molstar_viewer_to(viewer);
    molstar.then(molstar => {
        connection.reader.listen(e => {
            // @ts-ignore
            if (e.method === 'set_monomers_and_highlight') {
                //@ts-ignore
                molstar.load(e.param.monomer_list, e.param.highlight_index)
            }
        });
        viewer.addEventListener('resize', (() => { molstar.plugin.handleResize(); }));


        // set camera type
        let perspective = document.getElementById('perspective')! as HTMLInputElement;
        let orthographic = document.getElementById('orthographic')! as HTMLInputElement;
        perspective.addEventListener('click', () => {
            if (perspective.checked) {
                molstar.plugin.canvas3d?.camera.setState({
                    mode: 'perspective'
                });
            }
        });
        orthographic.addEventListener('click', () => {
            if (orthographic.checked) {
                molstar.plugin.canvas3d?.camera.setState({
                    mode: 'orthographic'
                });
            }
        });

        // set fog
        let fog = document.getElementById('fog')! as HTMLInputElement;
        fog.addEventListener('change', () => {
            molstar.plugin.canvas3d?.camera.setState({
                fog: parseFloat(fog.value)
            });
            // seems redundant, but without this, the fog won't be applied
            molstar.plugin.canvas3d?.handleResize();
        });

        // set fov
        let fov = document.getElementById('fov')! as HTMLInputElement;
        fov.addEventListener('change', () => {
            molstar.plugin.canvas3d?.camera.setState({
                fov: parseFloat(fov.value) / 180 * Math.PI
            });
        });
    })
});

// https://stackoverflow.com/a/65996386/18245120
async function copyToClipboard(textToCopy: string) {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
}

// https://github.com/microsoft/monaco-editor/issues/1618
// https://stackoverflow.com/questions/58271107/offset-between-text-and-cursor-with-the-monaco-editor-angular-under-chrome-m
document.fonts.ready.then(() => {
    editor.remeasureFonts()
})