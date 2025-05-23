import { StructureSelection } from 'molstar/lib/mol-model/structure';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui/react18';
import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context';
import { DefaultPluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { PluginCommands } from 'molstar/lib/mol-plugin/commands';
import { Script } from 'molstar/lib/mol-script/script';
import { Color } from 'molstar/lib/mol-util/color';
import { StripedResidues } from 'molstar/lib/examples/basic-wrapper/coloring';
import { CustomColorThemeProvider } from 'molstar/lib/examples/basic-wrapper/custom-theme';


class MolstarBasicWrapper {
    plugin: PluginUIContext;
    last_xyz: string[] = [];
    // last_highlight_index: number = -1;

    constructor(plugin: PluginUIContext) {
        this.plugin = plugin;

        this.plugin.representation.structure.themes.colorThemeRegistry.add(StripedResidues.colorThemeProvider!);
        this.plugin.representation.structure.themes.colorThemeRegistry.add(CustomColorThemeProvider);
        this.plugin.managers.lociLabels.addProvider(StripedResidues.labelProvider!);
        this.plugin.customModelProperties.register(StripedResidues.propertyProvider, true);

        // this.plugin.managers.dragAndDrop.addHandler('custom-wrapper', (files) => {
        //     if (files.some(f => f.name.toLowerCase().endsWith('.testext'))) {
        //         console.log('.testext File dropped');
        //         return true;
        //     }
        //     return false;
        // });

        this.setBackground(0xffffff);
    }

    public static async init(elem: HTMLElement) {
        let plugin = await createPluginUI(elem, {
            ...DefaultPluginUISpec(),
            layout: {
                initial: {
                    isExpanded: false,
                    showControls: false
                }
            },
            components: {
                remoteState: 'none'
            }
        })

        return new MolstarBasicWrapper(plugin);
    }

    setBackground(color: number) {
        PluginCommands.Canvas3D.SetSettings(this.plugin, {
            settings: props => {
                props.renderer.backgroundColor = Color(color);
            }
        });
    }

    async load(xyz_list: string[], highlight_index: number) {

        update_structure: {
            if (xyz_list.map((xyz, i) => xyz === this.last_xyz[i]).reduce((a, b) => a && b)) {
                break update_structure;
            }
            await this.plugin.clear(false);

            this.last_xyz = xyz_list;

            // const data = await this.plugin.builders.data.download({ url: Asset.Url(url), isBinary }, { state: { isGhost: true } });
            let chains = await Promise.all(xyz_list.map(async xyz => {
                const data = await this.plugin.builders.data.rawData({
                    data: xyz, label: 'test'
                }, { state: { isGhost: true } });
                const trajectory = await this.plugin.builders.structure.parseTrajectory(data, 'xyz');
                const model = await this.plugin.builders.structure.createModel(trajectory);
                const structure = await this.plugin.builders.structure.createStructure(model, void 0);

                return this.plugin.builders.structure.tryCreateComponentStatic(structure, 'all');
                // if (chain) await this.plugin.builders.structure.representation.addRepresentation(chain, { type: 'ball-and-stick' });
            }));


            await Promise.all(chains.map(chain => {
                if (chain) {
                    return this.plugin.builders.structure.representation.addRepresentation(chain, { type: 'ball-and-stick' });
                }
                return;
            }));

            this.plugin.managers.camera.reset();
        }

        update_highlight: {
            if (highlight_index === -1) {
                this.plugin.managers.interactivity.lociHighlights.clearHighlights();
                break update_highlight;
            }

            const data3 = this.plugin.managers.structure.hierarchy.current.structures[highlight_index]?.cell.obj?.data;
            if (!data3) break update_highlight;

            const seq_id = 1;
            const sel = Script.getStructureSelection(Q => Q.struct.generator.atomGroups({
                'residue-test': Q.core.rel.eq([Q.struct.atomProperty.macromolecular.label_seq_id(), seq_id]),
                'group-by': Q.struct.atomProperty.macromolecular.residueKey()
            }), data3);
            const loci = StructureSelection.toLociWithSourceUnits(sel);
            this.plugin.managers.interactivity.lociHighlights.highlightOnly({ loci });
        }
    }

}

export function attach_molstar_viewer_to(elem: HTMLElement): Promise<MolstarBasicWrapper> {
    return MolstarBasicWrapper.init(elem);
}